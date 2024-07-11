import React from 'react';
import PropTypes from 'prop-types';

const PriceBadge = ({ price, currency, oldPrice, color }) => {
    function formatCurrency(value) {
        const stringValue = value;
        const numericValue = parseFloat(stringValue);
        return numericValue.toFixed(2).replace('.', ',');
    }

    return (
        <div className={`inline-flex items-center px-3 py-1 rounded-full ${color}`}>
            {oldPrice && (
                <span className="text-xs sm:text-sm line-through mr-2 font-semibold text-gray-500">
                    {currency} {formatCurrency(oldPrice)}
                </span>
            )}
            <span className="text-lg font-semibold">
                {currency} {formatCurrency(price)}
            </span>
        </div>
    );
};

PriceBadge.propTypes = {
    price: PropTypes.number.isRequired,
    currency: PropTypes.string,
    oldPrice: PropTypes.number,
    color: PropTypes.string,
};

PriceBadge.defaultProps = {
    currency: 'R$',
    oldPrice: null,
    color: 'bg-primary_blue text-white',
};

export default PriceBadge;
