import React, { useContext } from "react";
import "./reservations-section.scss";
import deviceImg from "assets/illustrations/device.png";
import bookImg from "assets/illustrations/book.png";
import roomImg from "assets/illustrations/room.png";
import { CategoryCard } from "components";
import { GlobalContext } from "containers";

export const ReservationsSection = () => {
  const { userData } = useContext(GlobalContext);

  const categories = [
    {
      id: "reservations-booked-categories-1",
      image: deviceImg,
      title: "Devices",
      link: "reservations/devices",
      reserved: userData.reservations.devices
        ? userData.reservations.devices.length
        : 0,
    },
    {
      id: "reservations-booked-categories-2",
      image: bookImg,
      title: "Books",
      link: "reservations/books",
      reserved: userData.reservations.books
        ? userData.reservations.books.length
        : 0,
    },
    {
      id: "reservations-booked-categories-3",
      image: roomImg,
      title: "Rooms",
      link: "#",
      reserved: userData.reservations.rooms
        ? userData.reservations.rooms.length
        : 0,
    },
  ];
  return (
    <section className="reservations-section">
      <h2 className="section-title">Reservations</h2>
      <div className="reservations-section__categories">
        {categories.map((category) => (
          <CategoryCard key={category.id} subTitle="Reserved" data={category} />
        ))}
      </div>
    </section>
  );
};
