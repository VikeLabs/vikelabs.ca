import { Box, Center, Flex, Text, Heading } from "@chakra-ui/react";
import React, { Component } from "react";
import CalendarDays from "../components/calendar-days";
import { BaseLayout } from "../layouts/base";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

interface CalendarState {
  events: any[];
  currentDay: Date;
}

export default class Calendar extends Component<{}, CalendarState> {
  weekdays: string[];
  months: string[];
  events: any[];
  constructor(props: {}) {
    super(props);

    this.weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    //JS Date objects month starts at 0 smh
    this.events = [
      {
        date: new Date(2024, 0, 31),
        title: "Figma Workshop",
        description: "@ 5PM in ELL 016",
      },
      {
        date: new Date(2024, 1, 9),
        title: "Vim Workshop",
        description: "@ 5PM in ECS 130",
      },
    ];

    this.state = {
      events: this.events,
      currentDay: new Date(),
    };
  }

  render() {
    return (
      <>
        <Header />
        <Flex
          className="calendar"
          direction="column"
          justify="center"
          align="center"
          bgGradient="linear(to-l, #9bd4d2, #ffc6e3)"
          py="2"
        >
          <div className="calendar-header">
            <Heading textAlign="center" fontWeight="black" paddingTop={10}>
              VikeLabs Workshop Schedule
            </Heading>
            <Box padding={3}>
              <Text fontWeight="semibold" align="center">
                {this.months[this.state.currentDay.getMonth()]}{" "}
                {this.state.currentDay.getFullYear()}
              </Text>
            </Box>
            <Flex
              className="weekdays"
              direction="row"
              width={900}
              justify="space-between"
            >
              {this.weekdays.map((day) => (
                <Box className="weekday" m="2" width={125}>
                  <Text align="center">{day}</Text>
                </Box>
              ))}
            </Flex>
          </div>
          <CalendarDays day={this.state.currentDay} events={this.events} />
        </Flex>
        <Footer />
      </>
    );
  }
}
