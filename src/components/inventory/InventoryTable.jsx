import { useState } from 'react';
import milanunciosIcon from '../../assets/icons/platforms/milanuncios.png';
import vintedIcon from '../../assets/icons/platforms/vinted.png';
import wallapopIcon from '../../assets/icons/platforms/wallapop.png';

function InventoryTable({ items }) {

    const [expandedItem, setExpandedItem] =
        useState(null);

    return (
        <div className="table-wrapper">
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Image</th>

                        <th>Product</th>

                        <th>Price</th>

                        <th>Profit</th>

                        <th>Status</th>

                        <th>Platforms</th>

                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <>
                            <tr
                                key={item.id}
                                className="inventory-row"
                            >
                                <td className="table-image-cell">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="table-image"
                                    />
                                </td>

                                <td>
                                    <div className="table-product">
                                        <span className="table-title">
                                            {item.title}
                                        </span>

                                        <span className="table-id">
                                            ITEM-{item.id}
                                        </span>
                                    </div>
                                </td>

                                <td className="table-price">
                                    {item.price}
                                </td>

                                <td className="table-profit">
                                    {item.profit}
                                </td>

                                <td>
                                    <span className="table-status">
                                        {item.status}
                                    </span>
                                </td>

                                <td>
                                    <div className="platform-icons">
                                        <img
                                            src={wallapopIcon}
                                            alt="Wallapop"
                                            className="platform-icon"
                                        />

                                        <img
                                            src={vintedIcon}
                                            alt="Vinted"
                                            className="platform-icon"
                                        />

                                        <img
                                            src={milanunciosIcon}
                                            alt="Milanuncios"
                                            className="platform-icon"
                                        />
                                    </div>
                                </td>

                                <td>
                                    <div className="table-actions">
                                        <button className="action-btn">
                                            ✏️
                                        </button>

                                        <button className="action-btn">
                                            🗑️
                                        </button>

                                        <button
                                            className="action-btn"
                                            onClick={() =>
                                                setExpandedItem(
                                                    expandedItem === item.id
                                                        ? null
                                                        : item.id
                                                )
                                            }
                                        >
                                            {expandedItem === item.id
                                                ? '▲'
                                                : '▼'}
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            {expandedItem === item.id && (
                                <tr className="expanded-row">
                                    <td colSpan="7">
                                        <div className="expanded-content">

                                            <div>
                                                <strong>Description:</strong>

                                                <p>
                                                    {item.description}
                                                </p>
                                            </div>

                                            <div>
                                                <strong>Purchase Price:</strong>

                                                <p>
                                                    {item.buy}
                                                </p>
                                            </div>

                                            <div>
                                                <strong>Commission:</strong>

                                                <p>
                                                    {item.fees}
                                                </p>
                                            </div>

                                            <div>
                                                <strong>Profit:</strong>

                                                <p className="table-profit">
                                                    {item.profit}
                                                </p>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryTable;