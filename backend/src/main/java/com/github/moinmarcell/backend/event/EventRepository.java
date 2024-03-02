package com.github.moinmarcell.backend.event;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
}
