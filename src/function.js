const genint = (y, m, d) => {
  return y * 10000 + m * 100 + d;
};

const today = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let intdate = genint(year, month+1, day);

  return intdate;
};

const todaydate = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let stringdate = `${year}-${month+1}-${day}`;


  return stringdate;
}

const month = (m = "", y = "") => {
  let year = new Date().getFullYear();
  if (y === "") {
    year = new Date().getFullYear();
  } else {
    year = y;
  }

  let month;
  if (m === "") {
    month = new Date(year).getMonth() + 1;
  } else {
    month = m;
  }

  let lastday = new Date(year, month, 0).getDate();

  let startdate = genint(year, month, 1);
  let enddate = genint(year, month, lastday);

  return [startdate, enddate];
};

const year = (y = "") => {
  if (y === "") {
    y = new Date().getFullYear();
  }

  let startdate = genint(y, 1, 1);
  let enddate = genint(y, 12, 31);

  return [startdate, enddate];
};

const prevdatefunc = (date,month,year) => {
  if(date === 1)
  {
    if(month===1)
    {
      year = year - 1;
      month = 12;
      date = new Date(year, month, 0).getDate();
    }
    else
    {
      month = month - 1;
      date = new Date(year,month,0).getDate();
    }
  }
  else
  {
    date = date - 1;
  }
  return [date,month,year];
}

const nextdatefunc = (date, month, year) => {
  const lastday = new Date(year,month,0).getDate();
  // console.log(lastday )
  if(lastday === date)
  {
    date = 1;
    if(month===12)
    {
      month = 1;
      year = year + 1;
    }
    else
    {
      month = month + 1;
    }
  }
  else
  {
    date = date + 1;
  }
  return [date,month,year];
};

const prevmonthfunc = (month,year) => {
  
  let m;
  let y;
  if (month === 1) 
  {
      m = 12;
      y = year - 1;
  } 
  else 
  {
      m = month-1;
      y = year;
  }
  
  return [m,y];
}

const nextmonthfunc = (month,year) => {
  let m;
  let y;

  if (month === 12) 
  {
    m=1;
    y = year + 1;
  } 
  else 
  {
    m = month + 1;
    y = year;
  }

  return [m,y];
}

export {
  genint,
  today,
  todaydate,
  month,
  year,
  prevdatefunc,
  nextdatefunc,
  prevmonthfunc,
  nextmonthfunc,
};
