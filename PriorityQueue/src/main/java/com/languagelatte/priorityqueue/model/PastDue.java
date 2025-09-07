package com.languagelatte.priorityqueue.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class PastDue{
        public PastDue(java.time.LocalDateTime due_date, boolean passed, java.util.UUID cardID) {
        this.due_date = due_date;
        this.passed = passed;
        this.cardID = cardID;
    }


    public final LocalDateTime due_date;
    public final boolean passed;
    public final UUID cardID;
}