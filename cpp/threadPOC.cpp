// Use clang++ for a better thread sanitizer
// clang++ -fsanitize=thread -g threadPOC.cpp -o threadpoc -pthread
// clang++ -O3 -g threadPOC.cpp -o threadpoc -pthread
//./threadpoc ints.txt 20


#include <iostream>
#include <mutex>
#include <thread>
#include <queue>
#include <string>
#include <fstream>
#include <cassert>
#include <signal.h>

/************ Globals *************/
volatile bool JOIN_THREADS = false; 
std::mutex m;
/**********************************/

void readerThread(std::queue<std::string>& ints, std::mutex& m, std::ifstream& f);
void workerThread(std::queue<std::string>& ints, std::mutex& m);
void sigintHandler(int sig_num);

int main(int argc, char *argv[]) {
	signal(SIGINT, sigintHandler);

	std::queue<std::string> ints;
	std::ifstream file(argv[1]);
	
	int numThreads = std::stoi(argv[2]); 
	std::vector<std::thread> threads;
	threads.reserve(numThreads+1); // + 1 for the reader thread


	threads.push_back(std::thread(readerThread, std::ref(ints), std::ref(m), std::ref(file)));
	for(int i = 0; i < numThreads-1; i++) {
		threads.push_back(std::thread(workerThread, std::ref(ints), std::ref(m)));
	}

	std::this_thread::sleep_for(std::chrono::seconds(2));
	for(auto &t : threads) {
		t.join();
	}
	std::cout << "Done joining threads!" << std::endl;


}



void readerThread(std::queue<std::string>& ints, std::mutex& m, std::ifstream& f) {
	std::string line;
	while(std::getline(f, line)) {
		std::unique_lock<std::mutex> lk(m);
		ints.push(line);
		lk.unlock();
	}
	std::cout << "Finished reading from file" << std::endl;

}

void workerThread(std::queue<std::string>& ints, std::mutex& m){
	std::string temp;
	while(true){
		std::unique_lock<std::mutex> lk(m);
		if(!ints.empty() && !JOIN_THREADS){
			temp = ints.front();
			ints.pop();
			lk.unlock();
			std::cout << temp << std::endl;
		} else if (ints.empty() && !JOIN_THREADS) {
			// queue is empty but we want to keep running
			lk.unlock();
			continue;
		} else {
			// global var set to join the threads and end the program
			lk.unlock();
			break;
		}
	}
}


void sigintHandler(int sig_num){
	std::unique_lock<std::mutex> lk(m);
	JOIN_THREADS = true;
	lk.unlock();
	std::cout << "Signal to join threads" << std::endl;
}

