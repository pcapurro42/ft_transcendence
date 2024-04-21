require 'webrick'
# Toolkit pour déployer des serveurs HTTP/HTTPS

workdir = File.expand_path '.'
# Attribution à workdir du chemin absolu de '.'
server = WEBrick::HTTPServer.new :Port => 443, :DocumentRoot => workdir
# Création du serveur sur le port 443 avec comme répertoire racine '.'

trap 'INT' do
    puts "Ctrl-C detected. Shutting down server..."
    server.shutdown 
end
# Réception du signal INT (= SIGINT = Ctrl-C) pour éteindre le serveur

server.start
# Lancement du serveur