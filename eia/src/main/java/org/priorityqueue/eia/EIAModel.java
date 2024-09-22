package org.priorityqueue.eia;

import io.jstach.jstache.JStache;
import java.util.List;

@JStache(path = "templates/eia.mustache")
public record EIAModel(List<StringWrapper> dates, List<EIADataSet> datasets) {

}

record StringWrapper(String s) {

}