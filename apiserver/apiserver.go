package main

import (
	"flag"
	"fmt"
	"net/http"
)

func main() {

	var addr = flag.String("addr", ":8080", "The address we bind to")
	flag.Parse()

	http.HandleFunc("/api/teachers/", CorsWrap(teachersHandler))
	http.HandleFunc("/api/students/", CorsWrap(studentsHandler))

	http.Handle("/", staticWrapper(http.Dir("dist")))

	fmt.Println("Listening for requests at ", *addr)
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		panic(err)
	}

}

// staticWrapper returns /index.html for any missing files
// this helps to handle browserHistory
func staticWrapper(root http.FileSystem) http.Handler {
	return &staticServer{root: root, handler: http.FileServer(root)}
}

type staticServer struct {
	root    http.FileSystem
	handler http.Handler
}

func (s *staticServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// check for 404
	if _, err := s.root.Open(r.URL.Path); err != nil {
		fmt.Println("Not found: ", r.URL.Path)
		r.URL.Path = "/"
	}
	s.handler.ServeHTTP(w, r)
}
