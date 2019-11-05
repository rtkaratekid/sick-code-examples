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
#include <future>

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
	
	int numThreads = std::atoi(argv[2]); 
	
	for(int i = 0; i < numThreads; i++) {
		std::cout << "Adding thread number " << i << std::endl;
		std::async(std::launch::async, workerThread, std::ref(ints), std::ref(m));
	}

	std::async(std::launch::async, readerThread, std::ref(ints), std::ref(m), std::ref(file));
	std::cout << "Finished adding async functions!" << std::endl;

	return 0;
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
			std::cout << std::this_thread::get_id() << " " << temp << std::endl;
			std::this_thread::sleep_for(std::chrono::seconds(3));
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

