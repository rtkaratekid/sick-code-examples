#include <iostream>
#include <string>
#include <boost/asio.hpp>

std::string make_daytime_string()
{
  using namespace std; // For time_t, time and ctime;
  time_t now = time(0);
  return ctime(&now);
}


int main() {
	if(!BOOST_ASIO_HAS_LOCAL_SOCKETS) {
		std::cout << "boost cannot open a local socket" << std::endl;
		exit(1);
	}
	
	try {
			boost::asio::io_context io;
			std::cout << "Creating local socket server at \"/tmp/test\"" << std::endl;
			::unlink("/tmp/foobar"); // Remove previous binding.
			boost::asio::local::stream_protocol::endpoint ep("/tmp/test");
			boost::asio::local::stream_protocol::acceptor acceptor(io, ep);
			boost::asio::local::stream_protocol::socket socket(io);
			
			acceptor.accept(socket);

		for(;;) {
			// write to the connected socket
			std::string message = make_daytime_string();
			boost::system::error_code ignored_error;
			boost::asio::write(socket, boost::asio::buffer(message), ignored_error);
		}


	} catch (std::exception& e) {
		std::cerr << e.what() << std::endl;
	}

	return 0;

}
