//@ts-check
/*
import numpy as np
import random as rn
import os
import warnings
from version import __version__
*/
import {dot} from 'mathjs'
import {sample, sampleSize} from 'lodash'


function c_factor(n){

    return(2.0*(Math.log(n-1)+0.5772156649) - (2.0*(n-1.)/(n*1.0)))
}

/*
range function like python's
gotta put in your own stuff because I'm not gonna overload the function
*/
function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
}

/*
2D dot production fxn
*/
function dot_product(lhs, rhs){
    let result = 0
    for(let i=0;i<2;i++){
        result += lhs[i] * rhs[i]
    }
    return result
}




class iForest{
    
    /*
    Creates an iForest object. This object holds the data as well as the trained trees (iTree objects).
    Attributes
    ----------
    X : list
        Data used for training. It is a list of list of floats.
    nobjs: int
        Size of the dataset.
    sample: int
        Size of the sample to be used for tree creation.
    Trees: list
        A list of tree objects.
    limit: int
        Maximum depth a tree can have.
    exlevel: int
        Exention level to be used in the creating splitting critera.
    c: float
        Multiplicative factor used in computing the anomaly scores.
    Methods
    -------
    CheckExtensionLevel()
        Chaeck the validity of extension level provided by user based on the data
    compute_paths(X_in)
        Computes the anomaly score for data X_in
    */
    
    constructor(X, ntrees, sample_size, limit=null, extension_level=0){

        this.ntrees = ntrees
        this.X = X
        this.nobjs = X.length
        this.sample = sample_size
        this.Trees = []
        this.limit = limit
        this.exlevel = extension_level
        this.check_extension_level()
        if(limit == null){
            this.limit = Math.ceil(Math.log2(this.sample))                     // Set limit to the default as specified by the paper (average depth of unsuccesful search through a binary tree).
        }
        this.c = c_factor(this.sample)
        for(let i = 0; i < this.ntrees; i++){                                   // This loop builds an ensemble of iTrees (the forest).
            // TODO: get this working
            // let ix = rn.sample(range(this.nobjs), this.sample)
            let ix = Math.random() * (this.sample - this.nobjs) + this.nobjs
            let X_p = X[ix]
            // this.Trees.append(iTree(X_p, 0, self.limit, exlevel=self.exlevel))
            this.Trees.concat(new iTree(X_p, 0, this.limit, this.exlevel))
        }
    }

    check_extension_level() {
        let dim = this.X.dim    // gotta get the number of json fields somehow
        if(this.exlevel < 0){
            console.log("Extension level must be between 0 and " + String(dim-1))
            throw new Error()
        } else if(this.exlevel > dim-1){
            console.log("Extension cannot be greater than " + String(dim-1) + " dimensions")
            throw new Error()
        }
    }

    compute_paths(x_in=null){
        /*
        compute_paths(x_in = None)
        Compute anomaly scores for all data points in a dataset X_in
        Parameters
        ----------
        x_in : list of list of floats
                Data to be scored. iForest.Trees are used for computing the depth reached in each tree by each data point.
        Returns
        -------
        float
            Anomaly score for a given data point.
        */
        if(x_in == null) x_in = this.X
        // S = np.zeros(x_in.length)
        let S = new Array(x_in.length).fill(0)
        for(let i=0; i<x_in.length;i++){ 
            let h_temp = 0

            for(let j=0;j<this.ntrees;j++){
                ///////////// Not convinced this is going to work how I think because of the "new"
                let t_temp = new PathFactor(x_in[i], this.Trees[j])
                h_temp += t_temp.path*1.0            // Compute path length for each point
            }

            let Eh = h_temp/this.ntrees                                             // Average of path length travelled by the point in all trees.
            S[i] = 2.0**(-Eh/this.c)                                            // Anomaly Score
        }
        return S

    }

}


class Tree_Node {
    /*
    A single node from each tree (each iTree object). Tree_Nodes containe information on hyperplanes used for data division, date to be passed to left and right nodes, whether they are external or internal nodes.
    Attributes
    ----------
    e: int
        Depth of the tree to which the node belongs.
    size: int
        Size of the dataset present at the node.
    X: list
        Data at the node.
    n: list
        Normal vector used to build the hyperplane that splits the data in the node.
    p: list
        Intercept point through which the hyperplane passes.
    lef: Tree_Node object
        Left child node.
    right: Tree_Node object
        Right child node.
    ntype: str
        The type of the node: 'exTree_Node', 'inNode'.
    */

   constructor(x, n, p, e, left, right, node_type=''){
      /* 
        Tree_Node(X, n, p, e, left, right, node_type = '' )
        Create a node in a given tree (iTree objectg)
        Parameters
        ----------
        X : list of list of floats
            Training data available to each node. List of [x1,x2,...,xn] coordinate points.
        n : list of floats
            Normal vector for the hyperplane used for splitting data.
        p : list of floats
            Intercept point for the hyperplane used for splitting data.
        left : Tree_Node object
            Left child node.
        right : Tree_Node object
            Right child node.
        node_type : str
            Specifies if the node is external or internal. Takes two values: 'exTree_Node', 'inNode'.
        */
        this.e = e
        this.size = x.length
        this.x = x // to be removed
        this.n = n
        this.p = p
        this.left = left
        this.right = right
        this.ntype = node_type
   }
}



class iTree {

    /*
    A single tree in the forest that is build using a unique subsample.
    Attributes
    ----------
    exlevel: int
        Extension level used in the splitting criteria.
    e: int
        Depth of tree
    X: list
        Data present at the root node of this tree.
    size: int
        Size of the dataset.
    dim: int
        Dimension of the dataset.
    Q: list
        List of ordered integers smaller than dim.
    l: int
        Maxium depth a tree can reach before its creation is terminated.
    n: list
        Normal vector at the root of this tree, which is used in creating hyperplanes for splitting critera
    p: list
        Intercept point at the root of this tree through which the splitting hyperplane passes.
    exnodes: int
        The number of external nodes this tree has.
    root: Tree_Node object
        At each node create a new tree.
    Methods
    -------
    make_tree(X, e, l)
        Builds the tree recursively from a given node. Returns a Tree_Node object.
    */

    constructor(x, e, l, exlevel=0){
        /*
        iTree(X, e, l, exlevel=0)
        Create a tree
        Parameters
        ----------
        X : list of list of floats
            Subsample of training data. |X| = iForest.sample_size. List of [x1,x2,...,xn] coordinate points
        e : int
            Depth of the tree as it is being traversed down. e <= l.
        l : int
            The maximum depth the tree can reach before its creation is terminated.
        exlevel : int
            Specifies degree of freedom in choosing the hyperplanes for dividing up data. Must be smaller than the dimension n of the dataset.
        */

        this.exlevel = exlevel
        this.e = e
        this.x = x                                                              // save data for now. Not really necessary.
        this.size = x.length
        this.dim = this.x.shape[1]
        this.Q = np.arange(np.shape(x)[1], dtype='int')                         // n dimensions
        this.l = l
        this.p = null // Intercept for the hyperplane for splitting data at a given node.
        this.n = null // Normal vector for the hyperplane for splitting data at a given node.
        this.exnodes = 0
        this.root = this.make_tree(x,e,l)                                       // At each node create a new tree, starting with root node.

    }

    make_tree(x,e,l){
        /*
        make_tree(X,e,l)
        Builds the tree recursively from a given node. Returns a Tree_Node object.
        Parameters
        ----------
        X: list of list of floats
            Subsample of training data. |X| = iForest.sample_size. List of [x1,x2,...,xn] coordinate point.
        e : int
            Depth of the tree as it is being traversed down. Integer. e <= l.
        l : int
            The maximum depth the tree can reach before its creation is terminated. Integer.
        Returns
        -------
        Tree_Node object
       */ 
        this.e = e
        if(e >= l || x.length <= 1){                                               // A point is isolated in traning data, or the depth limit has been reached.
            let left = null 
            let right = null
            this.exnodes += 1
            return new Tree_Node(x, this.n, this.p, e, left, right, 'exNode')
        } else {                                                                   // Building the tree continues. All these nodes are internal.
            let mins = new Array 
            let maxs = new Array
            
            for(let i=0;i<x[0].length;i++){ // for each column
                let col = []
                for(let j=0;j<x.length;j++){ // for each row
                    col.concat(x[i][j])
                }
                // mins.concat(col[0])
                mins.concat(Math.min(...col))
                mins.concat(Math.max(...col))
            }
            // let mins = x.min(axis=0)
            // let maxs = x.max(axis=0)

            // Pick the indices for which the normal vector elements should be set to zero acccording to the extension level.
            // let idxs = np.random.choice(range(0, this.dim, 1), this.dim-this.exlevel-1, false) 
            let idxs = sampleSize(range(0, this.dim, 1), this.dim-this.exlevel-1)
            // Pick the indices for which the normal vector elements should be set to zero acccording to the extension level.
            // this.n = np.random.normal(0,1,this.dim)
            this.n = []
            for(let i=0;i<this.dim;i++){
                this.n.concat(Math.random())
            }                       

            this.n[idxs] = 0
            // this.p = np.random.uniform(mins,maxs)                               // Picking a random intercept point for the hyperplane splitting data.
            this.p = Math.random() * (Math.max(...maxs) - Math.min(...mins)) + Math.min(...mins)
            // let w = (x-this.p).dot(this.n) < 0                                      // Criteria that determines if a data point should go to the left or right child node.
            // let w = dot_product(x-this.p, this.n)
            let tmp = []
            for(var v=0;v<x.length;v++){
                tmp.concat(x[v] - this.p)
            }
            
            let w = dot(tmp, this.n)
            
            return new Tree_Node(x, this.n, this.p, e, this.make_tree(x[w],e+1,l), this.make_tree(x[~w],e+1,l), 'inNode')
        }
    }




}


class PathFactor{
    /*
    Given a single tree (iTree objext) and a data point x = [x1,x2,...,xn], compute the legth of the path traversed by the point on the tree when it reaches an external node.
    Attributes
    ----------
    path_list: list
        A list of strings 'L' or 'R' which traces the path a data point travels down a tree.
    x: list
        A single data point, which is represented as a list of floats.
    e: int
        The depth of a given node in the tree.
    Methods
    -------
    find_path(T)
        Given a tree, it finds the path a single data points takes.
    */

    constructor(x,itree){
       /* 
        PathFactor(x, itree)
        Given a single tree (iTree objext) and a data point x = [x1,x2,...,xn], compute the legth of the path traversed by the point on the tree when it reaches an external node.
        Parameters
        ----------
        x : list of floats
            A data point x = [x1, x2, ..., xn].
        itree : iTree object
            A single tree.
        */
        this.path_list=[]
        this.x = x
        this.e = 0
        this.path  = this.find_path(itree.root)
    }

    find_path(T){
        /*
        find_path(T)
        Given a tree, find the path for a single data point based on the splitting criteria stored at each node.
        Parameters
        ----------
        T : iTree object
        Returns
        -------
        int
            The depth reached by the data point.
        */
        if(T.ntype == 'exTree_Node'){
            if (T.size <= 1){
                return this.e
            } else { 
                this.e = this.e + c_factor(T.size)
                return this.e
            }
        } else {
            let p = T.p                                                             // Intercept for the hyperplane for splitting data at a given node.
            let n = T.n                                                             // Normal vector for the hyperplane for splitting data at a given node.

            this.e += 1
            // (this.x-p).dot(n)
            let tmp = []
            for(let i=0;i<this.x.length;i++){
                tmp.concat(this.x[i]-p)
            }
            if (dot(tmp, n) < 0){
                this.path_list.concat('L')
                return this.find_path(T.left)
            } else {
                this.path_list.concat('R')
                return this.find_path(T.right)
            }
        }
    }
}


// function all_branches(node, current=[], branches = null){
//     /*
//     Utility function used in generating a graph visualization. It returns all the branches of a given tree so they can be visualized.
//     Parameters
//     ----------
//     node: Tree_Node object
//     Returns
//     -------
//     list
//         list of branches that were reached.
//     */
//     current = current[:node.e]
//     if(branches == null) branches = []
//     if (node.ntype == 'inTree_Node'){
//         current.concat('L')
//         all_branches(node.left, current=current, branches=branches)
//         current = current[:-1]
//         current.concat('R')
//         all_branches(node.right, current=current, branches=branches)
//     } else {
//         branches.append(current)
//     }
//     return branches
// }