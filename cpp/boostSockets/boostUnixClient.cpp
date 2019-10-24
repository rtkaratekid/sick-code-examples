#include <iostream>
#include <string>
#include <boost/asio.hpp>
#include <boost/array.hpp>

int main() {
        if(!BOOST_ASIO_HAS_LOCAL_SOCKETS) {
                std::cout << "boost cannot open a local socket" << std::endl;
                exit(1);
        }

        try {
                boost::asio::io_context io;
                std::cout << "Connecting to local socket server at \"/tmp/test\"" << std::endl;

		for (;;){
		boost::asio::local::stream_protocol::endpoint ep("/tmp/test");
		boost::asio::local::stream_protocol::socket socket(io);
		socket.connect(ep);
		
		    
		      boost::array<char, 128> buf;
		      boost::system::error_code error;

		      size_t len = socket.read_some(boost::asio::buffer(buf), error);

		      if (error == boost::asio::error::eof)
			break; // Connection closed cleanly by peer.
		      else if (error)
			throw boost::system::system_error(error); // Some other error.

		      std::cout.write(buf.data(), len);
		    }

	} catch (std::exception& e) {
                std::cerr << e.what() << std::endl;
        }

        return 0;

}
