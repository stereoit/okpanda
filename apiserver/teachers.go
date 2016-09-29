package main

import (
	"encoding/json"
	"fmt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

type Teacher struct {
	Id      bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name    string        `json:"name"`
	Slots   []interface{} `json:"slots"`
	Lessons []interface{} `json:"lessons"`
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

	id := strings.Replace(req.URL.Path, "/api/teachers/", "", -1)

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
			if result == nil {
				result = []Teacher{}
			}
			if err != nil {
				log.Fatal(err)
			}
		}
	case "POST":
		body, err := ioutil.ReadAll(req.Body)
		if err != nil {
			panic(err)
		}
		var teacher Teacher
		err = json.Unmarshal(body, &teacher)
		if err != nil {
			panic(err)
		}
		i := bson.NewObjectId()
		teacher.Id = i

		err = c.Insert(teacher)
		if err != nil {
			log.Fatalln(err)
		}

		err = c.Find(bson.M{"_id": i}).All(&result)
		if err != nil {
			log.Fatal(err)
		}
	case "PUT":
		log.Println("PUT method id: ", id)
		body, err := ioutil.ReadAll(req.Body)
		if err != nil {
			panic(err)
		}
		var teacher Teacher
		err = json.Unmarshal(body, &teacher)
		if err != nil {
			panic(err)
		}
		i := bson.ObjectIdHex(id)
		teacher.Id = i
		err = c.Update((bson.M{"_id": i}), teacher)
		if err != nil {
			log.Fatal(err)
		}
		err = c.Find(bson.M{"_id": i}).All(&result)
		if err != nil {
			log.Fatal(err)
		}
	case "DELETE":
		err = c.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
		if err != nil {
			log.Fatal(err)
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
