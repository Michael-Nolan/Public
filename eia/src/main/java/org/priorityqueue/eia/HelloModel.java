package org.priorityqueue.eia;

import io.jstach.jstache.JStache;

@JStache(path = "templates/hello.mustache")
public record HelloModel(String message) {

}