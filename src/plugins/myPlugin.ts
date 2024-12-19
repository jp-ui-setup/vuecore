interface PluginOptions{
  property?: string
}


const MyPlugin = {
  install(app: App, options: PluginOptions={}){
  app.config.globalProperties.$myGlobalProperty = options.property || 'default value'
  app.config.globalProperties.$myGlobalMethod = function(){
    console.log("Hello from MyPlugin");
  }
  app.component('MyComponent', {
    template: '<div><h1>my custom plugin</h1></div>'
  })
  }
}

export default MyPlugin;
