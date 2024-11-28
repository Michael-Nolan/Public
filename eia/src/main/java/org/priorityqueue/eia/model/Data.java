package org.priorityqueue.eia.model;

import java.util.List;


public record Data(List<String> dates, List<Series> data){}


record Series(String name, List<String> data){}
/* 

Dates: []String
[
    label:string
    data []string
]

*/