import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
  .withUrl(`${process.env.BACK_API}/taskHub`)
  .configureLogging(LogLevel.Information)
  .build();

async function start() {
  try {
    await connection.start();
    console.log('SignalR Connected.');
  } catch (err) {
    console.log(err);
    setTimeout(start, 5000);
  }
}

connection.onclose(async () => {
  await start();
});

async function sendTask(task: string) {
  try {
    await connection.invoke('SendTask', task);
  } catch (err) {
    console.log(err);
  }
}

export default connection;
export { start, sendTask };
