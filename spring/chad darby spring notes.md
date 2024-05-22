## Inversion of Control
- outsourcing construction/management of objects.
- **Spring Container**
	- handles the IoC
	- injects object dependencies 

## Dependency Injection
- **dependency inversion principle** - client delegates to other object the responsibility of providing its dependencies
- **Constructor/setter injection**:
	- using a constructor or a setter method to inject dep.
	- Constructor injections - recommended for required dependencies
	- setter -> optional dependencies
	- Spring looks for a bean of the class or the implementation of the interface in the application context
	- **multiple implementations**
		- spring will not know what to do if there are multiple implementations of the dep to be injected
		- use @Qualifer annotation can solve that ambiguity by specifying which bean needs to be injected - more recommend
		- you can also used @Primary on the implementation you want to be used as the default one. if you use both @Qualifer and @Primary, @Qualifer has higher priority.
- **Field injection** - no longer recommended bc it makes things harder to unit test
```java

// constructor injection

public class MyService {
    private final MyRepository repository;

	// @Autowired optional when there is only one constructor
    public MyService(MyRepository repository) {
        this.repository = repository;
    }
}
// setter injection
public class MyService {
    private MyRepository repository;

	@Autowired
    public void setRepository(MyRepository repository) {
        this.repository = repository;
    }
}

// field injection
// dont do this
public class MyService {
	@Autowired
    private MyRepository repository;

}
```
## Spring Bean
- regular java class that is managed by Spring

## Component scanning
- Spring can automatically detect/register beans into application context from packages and sub-packages (as well as any other user-specified packages

## lazy initialization
- by default, all beans are initialized in spring container
- @Lazy on a bean can make it so it is not initliazed until it is needed
- to  make this global, `spring.main.lazy-initialization=true` in application.properties

## Bean scope
- life-cycle of a bean, how long its initialized, how many instances, etc.
- **default scope is singleton**
	- creates one instance, caches it in memory and all dep injections for this bean use that same instance, reference same bean
- **prototype** - creates new bean instance each time
- can change scope on a bean using `@Scope` annotation
	- `@Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)`
## Bean lifecycle methods
- `@PostConstruct` -> method for custom initialization logic
- `@PreDestroy` -> method for custom logic before bean is destroyed.

## Java Config
- uses @Configuration and @Bean annotations
- useful for more complex beans, external third party class that you want to use as bean