import PropTypes from 'prop-types';
import { FilterInput } from './Filter.styled';

const Filter = ({value, onChange}) => {
    return (
        <label>
            Find contacts by name
            <FilterInput type="text" value={value} onChange={onChange}/>
        </label>
    )
};

export default Filter;

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}