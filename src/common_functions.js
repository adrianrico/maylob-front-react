export function isValid(input_to_validate)
{
    if (input_to_validate == undefined || input_to_validate == '' || input_to_validate == null) 
    {
        return false
    }else
    {
        return true
    }   
}

export function buildDropdown(objects, object_option_property, default_value)
{
    let built_options = [default_value]

    objects.forEach(element => { built_options.push(element[object_option_property]) });

    return built_options
}

export function buildDefaultObject(originalObject)
{
    let default_object = structuredClone(originalObject)

    // Set Values to default; Can be deep processed in call...
    Object.entries(default_object).forEach(([Key,Value]) =>{default_object[Key] = ''})

    return default_object
}