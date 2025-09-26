package com.languagelatte.priorityqueue.model;

import java.util.UUID;


public final class Card{
    public Card(java.util.UUID id, String context, String front, String back) {
        this.id = id;
        this.context = context;
        this.front = front;
        this.back = back;
    }

    public final UUID id;
    public final String  context;
    public final String  front;
    public final String  back;
}