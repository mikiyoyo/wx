
--活动表创建
CREATE TABLE `add_activities`(
  `actid` int(5) NOT NULL,
  `aname` varchar(50) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `longitude` VARCHAR(50) NOT NULL,
  `latitude` VARCHAR(50) NOT NULL,
  `stime` DATETIME NOt NUll,
  PRIMARY KEY(`actid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
ALTER TABLE `add_activities`
  MODIFY `actid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--打卡人表
CREATE TABLE `worker`(
    `userid` VARCHAR(50) Not NULL,
    `name` VARCHAR(50) NOT NULL,
    `number` VARCHAR(50) NOT NULL,
    `sign_face` Boolean DEFAULT false,
    PRIMARY KEY(`userid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--打卡情况表
CREATE TABLE `act_name+useid`(
    `userid` VARCHAR(50) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `number` VARCHAR(50) NOT nULL,
    `atime` DATETIME NOt NULL,
    
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;