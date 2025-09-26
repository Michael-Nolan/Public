package com.languagelatte.priorityqueue.model;

import java.time.LocalDateTime;
import java.util.UUID;

public record FutureReview(LocalDateTime due_date, boolean isNew, UUID cardID, UUID id){}