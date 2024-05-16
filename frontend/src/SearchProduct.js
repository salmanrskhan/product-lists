import Header from "./Header";
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

function SearchProduct() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  async function search(key) {
    setSearchQuery(key);

    if (key.length) {
      let result = await fetch(`https://product-lists-ser.vercel.app/product/search/${key}`);
      result = await result.json();
      setData(result);
    } else {
      setData([]);
    }
  }

  return (
    <div>
      <Header />
      <h2>Search</h2>
      <div className="col-sm-6 offset-sm-3">
        <input
          type="text"
          onChange={(e) => search(e.target.value)}
          value={searchQuery}
          placeholder="Search Product"
          className="form-control"
        />{' '}
        <br />
      </div>
      <div className="col-sm-10 offset-sm-1">
        {searchQuery.length > 0 && data.length > 0 ? ( 
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Image</th>
                <th>price</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>
                    <img
                      style={{ width: 100 }}
                      src={`https://product-lists-ser.vercel.app/${data.file}`}
                      alt={data.name}
                    />
                  </td>
                  <td>$ {data.price}</td>
                  <td>{data.descp}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h4>No matching products found</h4>
        )}
      </div>
    </div>
  );
}

export default SearchProduct;
