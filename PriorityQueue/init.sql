CREATE TABLE IF NOT EXISTS card (
    id UUID PRIMARY KEY,
    value JSON -- Temporarily using json for quick prototyping
);


-- Cards that have been reviewed in the past.
CREATE TABLE IF NOT EXISTS PAST_DUE (
   reviewed_at timestamp,
   card_id UUID REFERENCES card (id),
   passed boolean
);

-- Cards that are scheduled for review.
CREATE TABLE IF NOT EXISTS FUTURE_DUE (
    due_date timestamp,
    is_new boolean,
    card_id UUID REFERENCES card (id)
);