package com.languagelatte.priorityqueue.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class PastReview{
        public PastReview(LocalDateTime due_date, boolean passed, UUID cardID, UUID id) {
        this.due_date = due_date;
        this.passed = passed;
        this.cardID = cardID;
            this.id = id;
    }


public final UUID id;
    public final LocalDateTime due_date;
    public final boolean passed;
    public final UUID cardID;
}