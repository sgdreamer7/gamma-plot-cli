import fetch from 'node-fetch';
import asciichart from 'asciichart';

(async () => {
  const dataConfig = [
    {
      location: 'Наддніпрянське, селище міського типу Наддніпрянське, Херсонська область, Херсонський район, Хepсoнськa міська громада',
      url: 'https://www.saveecobot.com/maps/marker.json?marker_id=3902&marker_type=device&pollutant=gamma&pollutant_unit=ur&is_wide=1&is_iframe=0&is_widget=0&rand=2023-07-04T23-34%3A32'
    },
    {
      location: 'вулиця Пролетарська, 39, селище міського типу Велика Олександрівка, Херсонська область, Бериславський район, Вeликooлeксaндpівськa селищнa громада',
      url: 'https://www.saveecobot.com/maps/marker.json?marker_id=3895&marker_type=device&pollutant=gamma&pollutant_unit=ur&is_wide=1&is_iframe=0&is_widget=0&rand=2023-07-04T23-33%3A12'
    },
    {
      location: 'вулиця Озерна, місто Апостолове, Дніпропетровська область, Криворізький район, Апостолівська міська громада',
      url: 'https://www.saveecobot.com/maps/marker.json?marker_id=21766&marker_type=device&pollutant=gamma&pollutant_unit=ur&is_wide=1&is_iframe=0&is_widget=0&rand=2023-07-04T23-31%3A49'
    },
    {
      location: 'вулиця Запоріжська, село Біленьке, Запорізька область, Запорізький район, Білeньківськa сільська громада',
      url: 'https://www.saveecobot.com/maps/marker.json\?marker_id\=22564\&marker_type\=device\&pollutant\=gamma\&pollutant_unit\=ur\&is_wide\=1\&is_iframe\=0\&is_widget\=0\&rand\=2023-07-04T22-24%3A21'
    },
    {
      location: 'вулиця Шевченка, місто Нікополь, Дніпропетровська область, Нікопольський район, Нікoпoльськa міська громада',
      url: 'https://www.saveecobot.com/maps/marker.json?marker_id=21735&marker_type=device&pollutant=gamma&pollutant_unit=ur&is_wide=1&is_iframe=0&is_widget=0&rand=2023-07-04T23-23%3A47'
    },
    {
      location: 'вулиця Борзенко 41, місто Нікополь, Дніпропетровська область, Нікопольський район, Нікoпoльськa міська громада',
      url: 'https://www.saveecobot.com/maps/marker.json?marker_id=3887&marker_type=device&pollutant=gamma&pollutant_unit=ur&is_wide=1&is_iframe=0&is_widget=0&rand=2023-07-04T23-25%3A48'
    },
    {
      location: 'вулиця Залізнична, місто Запоріжжя, Запорізька область, Запорізький район, Зaпopізькa міська громада',
      url: 'https://www.saveecobot.com/maps/marker.json?marker_id=21742&marker_type=device&pollutant=gamma&pollutant_unit=ur&is_wide=1&is_iframe=0&is_widget=0&rand=2023-07-04T23-28%3A07'
    },
    {
      location: 'Черкаський провулок, 19, місто Запоріжжя, Запорізька область, Запорізький район, Зaпopізькa міська громада',
      url: 'https://www.saveecobot.com/maps/marker.json?marker_id=3928&marker_type=device&pollutant=gamma&pollutant_unit=ur&is_wide=1&is_iframe=0&is_widget=0&rand=2023-07-04T23-29%3A26'
    }
  ];
  const outputs = await Promise.all(
    dataConfig.map(async ({ location, url }) => {
      const data = await fetch(url);
      const { history } = await data.json();
      const keys = Object.keys(history);
      const timestamps = keys
        .sort((a, b) => b.localeCompare(a))
        .slice(0, Math.min(60, keys.length));
      const plotData = timestamps
        .map((timestamp) => history[timestamp]);

      return `${location}\n${timestamps[0]} <---> ${timestamps[timestamps.length - 1]}\n      мкР/год\n${asciichart.plot(plotData, { height: 10 })}\nмакс: ${plotData.reduce((previousValue, currentValue) => Math.max(previousValue, currentValue).toFixed(0), 0)} мкР/год\n\n`;
    })
  );
  outputs.forEach((output) => console.log(output));

})();

