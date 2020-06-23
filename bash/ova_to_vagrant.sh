#!/bin/bash

# .ova to Vagrant converter

# check args
if [ "$#" -ne 2 ]
then
  echo -e "Give .ova file and what you'd like the new Vagrant box name to be please"
  echo -e "./ova_to_vagrant.sh <.ova file> <vagrant box name>"
  exit -1
fi

# verify .ova file very loosely
if [[ "$1" == *".ova"* ]]
then
  OVA=$1
  VAG_NAME=$2

  # import to VBox and get its hash
  VBoxManage import "$OVA" --vsys 0 --eula accept
  SERIAL=$(VBoxManage list vms | tail -1 | cut -d "{" -f2 | cut -d "}" -f1)
  echo -e "\nNew VBox hash: $SERIAL"

  # turn into a Vagrant format and add to your box repository
  vagrant package --base "$SERIAL" --output "$VAG_NAME".box
  vagrant box add "$VAG_NAME".box --name "$VAG_NAME"

  # create a directory and vagrantfile
  mkdir "$VAG_NAME"
  cd "$VAG_NAME"
  vagrant init "$VAG_NAME"
  cd ..

  echo -e "\"cd\" to $VAG_NAME and run \"vagrant up\" to finish!" 

else
  echo -e "I need an '.ova' file please"
  exit -1
fi

exit 0
