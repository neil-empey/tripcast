const GetWeather = (props) => {
  let descrip = [];
  props.weather.map((x) => {
    if (x["alerts"] !== undefined) {
      descrip.push({current_descrip: x["daily"][0]["weather"][0]["description"],
        alerts: x["alerts"][0]["event"],
        icon: x["daily"][0]["weather"][0]["icon"]
      })
    }else{
      descrip.push({current_descrip: x["daily"][0]["weather"][0]["description"],
      alerts: "N/A",
      icon: x["daily"][0]["weather"][0]["icon"]
    })
    }
  }
  return (

  )
}

export default GetWeather;
