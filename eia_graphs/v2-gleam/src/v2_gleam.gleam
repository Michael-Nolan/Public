// IMPORTS ---------------------------------------------------------------------

import gleam/int
import gleam/string
import gleam/time/calendar
import gleam/time/timestamp
import lustre
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html
import lustre/event


pub fn main() {
  let app = lustre.simple(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

type Model =
  String

fn init(_) -> Model {
  http.get("/static/data.json", expect_json(user_decoder(), GotJson))
  "test"
}

type Msg {
  Msg(String)
}

fn update(model: Model, msg: Msg) -> Model {
  case msg {
    Msg(x) -> x
  }
}

fn view(model: Model) -> Element(Msg) {
  html.main([], [html.text(model)])
}
