require 'socket'

server = TCPServer.new('localhost', 8080)

while (true) do
    client = server.accept
    client.sendmsg("connecté\n")
    url = client.readpartial(2048)
    puts url
    client.close
end