-- user_role
insert into
    user_role (user_role_name)
  values
    ('administrator'), ('expert'), ('user');

insert into
    app_user (email, first_name, last_name, user_role_id)
values
	('glitchbane@glossatronic.com', 'Sheila', 'Leverson', 1),
    ('admin@glossatronic.com', 'fake', 'admin', 1),
    ('expert@glossatronic.com', 'fake', 'expert', 2),
    ('user@glossatronic.com', 'fake', 'user', 3);

-- request-type
insert into
    request_type (request_type_name)
  values
    ('term'), ('translation'), ('language'), ('expert'), ('correction');

-- request-status
insert into
    request_status (request_status_name)
  values
    ('unassigned'), ('assigned'), ('in review'), ('fulfilled');

-- preference_type
insert into
         preference_type (preference_type_name)
       values
         ('sort'), ('filter'), ('language'), ('glossary');
