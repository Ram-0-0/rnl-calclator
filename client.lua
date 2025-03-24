RegisterCommand('cal', function ()
    SetNuiFocus(true, true)
    SendNUIMessage({})
end)

RegisterNUICallback('closeUI', function (_, cb)
    cb({})
    SetNuiFocus(false, false)
end)