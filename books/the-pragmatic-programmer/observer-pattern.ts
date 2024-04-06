
interface Observer {
  notify: (data: any) => void;
}

class Subject {
  private observers: Observer[] = [];

  public registerObserver(observer: Observer) {
    this.observers.push(observer);
  }

  public unregisterObserver(observer: Observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  public notifyObservers(data: any) {
    for (const observer of this.observers) {
      observer.notify(data);
    }
  }

  public triggerSomeEvent(data: any) {
    this.notifyObservers(data);
  }
}

class ConcreteObserver implements Observer {
  private id: number;

  constructor(id: number) {
    this.id = id;
  }

  notify(data: any) {
    console.log('Received data:', data);
  }
}


const observer1 = new ConcreteObserver(1);
const subject = new Subject();

subject.registerObserver(observer1);

// trigger event

subject.triggerSomeEvent('Hello World!');
