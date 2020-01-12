const express = require("express")

const http = require("http")
const app = express()

app.get("/", (req, res) => {
      console.log("test")
})

app.get("/jan", async (req, res) => {
      let body = ""
      let data = await new Promise(resolve => {
            http.get(
                  "http://35.194.179.37:5000/api/getdata?fbclid=IwAR3cc15c4iNPP59v4w2IXQhXplJ6Yp39rkluGzVlgKM5RjoXvIy_yAQbu8g",
                  res => {
                        res.setEncoding("utf8")

                        res.on("data", data => {
                              body += data
                        })
                        res.on("end", () => {
                              body = JSON.parse(body)
                              resolve(body)
                        })
                  }
            )
      })
      let arr = data.map(temp => {
            return { time: temp["Timestamp"] }
      })
      res.send(arr)
})

const PORT = process.env.PORT || 3090
// console.log(PORT)
app.listen(PORT)
