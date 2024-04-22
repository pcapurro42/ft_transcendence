require 'webrick'
require 'webrick/httpproxy'

WEBrick::HTTPProxyServer.new(:Port => 8080).start