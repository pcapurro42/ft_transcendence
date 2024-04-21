require 'webrick'
# Toolkit pour déployer des serveurs HTTP/HTTPS

workdir = File.expand_path '.'
# Attribution à workdir du chemin absolu de '.'
server = WEBrick::HTTPServer.new :Port => 443, :Bindaddress => '127.0.0.1', :Logger => WEBrick::Log.new(File::NULL, WEBrick::Log::FATAL), :DocumentRoot => workdir
# Création du serveur sur le port 443 avec comme répertoire racine '.'
# À l'exception des logs d'accès, les logs du serveur sont redirigés pour ne pas apparaître dans la console
# 'WEBrick::Log::FATAL' définit les erreurs fatales comme niveau minimum d'erreur autorisé à être affiché

trap 'INT' do
    puts "\r^C detected. Shutting down server..."
    server.shutdown 
end
# Réception du signal INT (= SIGINT = Ctrl-C) pour éteindre le serveur

server.start
# Lancement du serveur