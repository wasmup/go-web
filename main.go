package main

import "flag"

func main() {
	var addr string
	flag.StringVar(&addr, "ip", ":8080", "ip:port")
	flag.Parse()

	serve(addr)
}
