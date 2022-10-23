-- sudo -u postgres psql
create database "StudyRooms";
create user study_user with encrypted password '1234Study';
grant all privileges on database "StudyRooms" to study_user;

select * from votesxanswers;
select * from ratingxanswers;
select * from answers order by id;
select * from users order by id;