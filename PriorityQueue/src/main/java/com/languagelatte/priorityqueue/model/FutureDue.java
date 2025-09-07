package com.languagelatte.priorityqueue.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class FutureDue{

    public FutureDue(java.time.LocalDateTime due_date, boolean isNew, java.util.UUID cardID) {
        this.due_date = due_date;
        this.isNew = isNew;
        this.cardID = cardID;
    }


    public final LocalDateTime due_date;
    public final boolean isNew;
    public final UUID cardID;
}