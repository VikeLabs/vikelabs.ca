import { Box, WrapItem, Text, Flex } from "@chakra-ui/react";

function CalendarDays(props: { day: Date; events: any[] }) {
  let curDayOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1
  );
  let weekdayOfFirstDay = curDayOfMonth.getDay();

  let currentDays = [];

  let eventTitle = "";
  let eventDesc = "";

  //Calendar format = 6 rows of 7 days = 42 dates
  for (let day = 0; day < 42; day++) {
    eventTitle = "";
    eventDesc = "";
    // Offset shown date to start on most recent Sunday
    if (day === 0 && weekdayOfFirstDay === 0) {
      curDayOfMonth.setDate(curDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      curDayOfMonth.setDate(
        curDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      curDayOfMonth.setDate(curDayOfMonth.getDate() + 1);
    }

    let inclEvent = props.events.find((event) => {
      return (
        event.date.getDate() === curDayOfMonth.getDate() &&
        event.date.getMonth() === curDayOfMonth.getMonth()
      );
    });

    if (inclEvent) {
      eventTitle = inclEvent.title;
      eventDesc = inclEvent.description;
    }

    let calendarDay = {
      currentMonth: curDayOfMonth.getMonth() === props.day.getMonth(),
      date: new Date(curDayOfMonth) as unknown as string,
      month: curDayOfMonth.getMonth(),
      number: curDayOfMonth.getDate(),
      selected: curDayOfMonth.toDateString() === props.day.toDateString(),
      year: curDayOfMonth.getFullYear(),
      eventTitle: eventTitle,
      eventDesc: eventDesc,
    };
    currentDays.push(calendarDay);
  }

  return (
    <Flex
      css={{ flexFlow: "row wrap" }}
      direction="row"
      width={900}
      wrap="wrap"
      justify="center"
      className="table-content"
    >
      {currentDays.map((day) => {
        return (
          <Box width={125} height={100} borderColor="grey" borderWidth={0.5}>
            <Text color={day.selected ? "red" : "gray.800"} padding={1}>
              {day.number}
            </Text>
            <Box>
              <Text
                color={day.selected ? "red" : "blue"}
                fontSize={12}
                width={100}
                padding={1}
                fontWeight="bold"
              >
                {day.eventTitle} {day.eventDesc}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Flex>
  );
}

export default CalendarDays;
