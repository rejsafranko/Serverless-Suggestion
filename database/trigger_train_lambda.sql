DELIMITER $$
CREATE TRIGGER lambda_triger
AFTER INSERT ON searches.verified_searches
FOR EACH ROW
BEGIN
    CALL update_row_counter_and_trigger_train_lambda()
END$$
DEILIMITER ;