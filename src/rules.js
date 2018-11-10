// Based on laravel validation rules
// https://laravel.com/docs/5.7/validation#rule-accepted


export default {
  accepted: ({ value }) => isNotEmpty(value),

  after: ({ value, params }) => b(new Date(value) > new Date(params[0])),
  after_or_equal: ({ value, params }) => b(new Date(value) >= new Date(params[0])),

  alpha: ({ value }) => !/[^a-z]/i.test(value),
  alpha_dash: ({ value }) => /^[A-Za-z\-]+$/i.test(value),
  alpha_num: ({ value }) => /^[a-z0-9]+$/i.test(value),

  array: ({ value }) => Array.isArray(value),

  //bail: is on by default and can be set in `validateForm` call

  before: ({ value, params }) => b(new Date(value) < new Date(params[0])),
  before_or_equal: ({ value, params }) => b(new Date(value) <= new Date(params[0])),

  between: ({ value, params }) => {
    const [min, max] = params;

    if (value.hasOwnProperty('length')) {
      value = value.length;
    }

    return value > min && value < max;
  },

  boolean: ({ value }) => typeof value === 'boolean',

  confirmed: ({ value, key, values }) => b(value === values[`${key}_confirmed`]),
  date: ({ value }) => (Date.parse(value) !== NaN),
  date_equals: ({ value, params }) => (Date.parse(value) !== NaN && Date.parse(value) === Date.parse(params[0])),

  //date_format
  //different
  //digits
  //digits_between
  //dimensions

  distinct: ({ values, value }) => {
    return (Object.keys(values).reduce((count, key) => {
      if (values[key] == value) {
        count++;
      }
      return count;
    }, 0) === 1);
  },
  email: ({ value }) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),

  //file

  filled: ({ value }) => isNotEmpty(value),

  //gt
  //gte

  //image
  //in
  //in_array
  
  integer: ({ value }) => {
    return Number.isInteger(typeof value === 'string' ? parseInt(value) : value);
  },

  //ip
  //ipv4
  //ipv6

  json: ({ value }) => {
    try { JSON.parse(value ); } catch (e) { return false ;}
    return true;
  },

  //lt
  //lte

  //max

  //mimetypes?

  //min

  //not_in
  //not_regex

  numeric: ({ value }) => !isNaN(value),
  present: ({ value }) => value !== undefined,

  //regex

  required: ({ value }) => isNotEmpty(value),

  //required_if
  //required_unless
  //required_with
  //required_with_all
  //required_without
  //same
  //size

  string: ({ value }) => typeof value === 'string',

  //timezone
};

function isNotEmpty(value) {
  return !! value;
}

function b(value) {
  return isNotEmpty(value)
}