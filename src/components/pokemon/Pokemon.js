import React from "react";
import { FormattedMessage } from "react-intl";
import Table from "react-bootstrap/Table";
import GetData from "../../functions/GetData";
import "./Pokemon.css";
import Chart from "../chart/Chart";

export default function Pokemon() {
  const [data] = GetData();

  return (
    <div>
      <Table hover>
        <thead className="thead-dark text-left">
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              <FormattedMessage id="table.head.ThumbnailImage" />
            </th>
            <th scope="col">
              <FormattedMessage id="table.head.name" />
            </th>
            <th scope="col">
              <FormattedMessage id="table.head.description" />
            </th>
            <th scope="col">
              <FormattedMessage id="table.head.height" />
            </th>
            <th scope="col">
              <FormattedMessage id="table.head.weight" />
            </th>
            <th scope="col">
              <FormattedMessage id="table.head.type" />
            </th>
          </tr>
        </thead>
        <tbody className="text-left">
          {data &&
            data.map((pokemon) => (
              <tr key={pokemon.id}>
                <th>{pokemon.id}</th>
                <td>
                  <img
                    src={pokemon.ThumbnailImage}
                    alt={pokemon.name}
                    className="img-pokemon"
                  />
                </td>
                <td>{pokemon.name}</td>
                <td>{pokemon.description}</td>
                <td>{pokemon.height}</td>
                <td>{pokemon.weight}</td>
                <td>
                  {pokemon.type.map((typeP) => (
                    <span class="badge badge-secondary">{typeP}</span>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Chart data={data} />
    </div>
  );
}
