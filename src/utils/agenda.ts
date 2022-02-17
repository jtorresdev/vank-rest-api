import config from 'config'
import Agenda, { AgendaConfig } from 'agenda'

import Invoices from '../services/invoices'

const initAgenda = async () => {
  const agendaConfig: AgendaConfig = {
    db: { 
      address: config.get<string>('dbUriAgenda') 
    }
  }

  const agenda = new Agenda(agendaConfig)

  agenda.define('get invoices CSV', async () => {
    const invoicesService = new Invoices()
    const invoicesCSVsource = config.get<string>('invoicesCSVsource')
    
    await invoicesService.fetchInvoices(invoicesCSVsource)
  })

  await agenda.start()
  
  await agenda.every('24 hours', 'get invoices CSV')
}

export default initAgenda