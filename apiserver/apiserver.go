package main

import (
	"encoding/json"
	"fmt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"log"
	"net/http"
	"strings"
)

func main() {

	http.HandleFunc("/", simpleHandler)
	http.HandleFunc("/api/teachers", teachersHandler)

	bind := fmt.Sprintf("%s:%s", "127.0.0.1", "8081")
	fmt.Println("Listening for requests at ", bind)
	err := http.ListenAndServe(bind, nil)
	if err != nil {
		panic(err)
	}

}

type Teacher struct {
	Id   bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name string        `json:"name"`
}

func teachersHandler(res http.ResponseWriter, req *http.Request) {
	session, err := mgo.Dial("mongodb://127.0.0.1:27017")
	if err != nil {
		panic(err)
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)

	c := session.DB("panda").C("teachers")
	var result []Teacher

	id := strings.Replace(req.URL.Path, "/api/teachers", "", -1)

	if origin := req.Header.Get("Origin"); origin != "" {
		res.Header().Set("Access-Control-Allow-Origin", origin)
		res.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		res.Header().Set("Access-Control-Allow-Headers",
			"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	}

	res.Header().Set("Content-type", "application/json")

	switch req.Method {
	case "GET":
		if id != "" {
			err := c.Find(bson.M{"_id": bson.ObjectIdHex(id)}).All(&result)
			if err != nil {
				log.Fatal(err)
			}
		} else {
			err := c.Find(nil).All(&result)
			if err != nil {
				log.Fatal(err)
			}
		}
	default:
	}

	json, err := json.Marshal(result)
	if err != nil {
		log.Fatal(err)
		return
	}

	fmt.Fprintf(res, "%v", string(json))
}

func simpleHandler(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-type", "text/html")
	fmt.Fprintf(res, "Nothing to see here, move to /api/teachers\n")
}
