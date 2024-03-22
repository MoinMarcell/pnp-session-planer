package com.github.moinmarcell.backend.event;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    @Query(value = "{}", fields = "{id: 1, title: 1}")
    List<EventWithIdAndTitle> findAllByIdAndTitle();
}
