export type Group =
  | 'all'
  | 'big4' | 'big3' | 'global-banks' | 'investment' | 'consulting'
  | 'peru' | 'peru-commercial' | 'peru-state' | 'peru-cajas'

export interface Company {
  id: string
  name: string
  logo: string
  color: string
  monogram?: string
  groups: Group[]
  country: string
  countryFlag: string
  hq: string
  founded: number
  employees?: string
  revenue?: string
  aum?: string
  description: string
  services: string[]
  website: string
}

export const COMPANIES: Company[] = [

  /* ══ CONSULTING — Big 4 ══ */
  {
    id: 'pwc', name: 'PwC', logo: '/logos/pwc.png', color: '#D04A02',
    groups: ['big4', 'consulting'], country: 'United Kingdom', countryFlag: '🇬🇧',
    hq: 'London, UK', founded: 1849, employees: '364,000+', revenue: '$53.1B (2023)',
    description: 'PricewaterhouseCoopers es una de las redes de servicios profesionales más grandes del mundo, con presencia en 151 países. Ofrece auditoría, impuestos y consultoría a corporaciones líderes.',
    services: ['Audit & Assurance', 'Tax Advisory', 'Management Consulting', 'Deals & Transactions', 'Risk Management'],
    website: 'pwc.com',
  },
  {
    id: 'deloitte', name: 'Deloitte', logo: '/logos/deloitte.png', color: '#86BC25',
    groups: ['big4', 'consulting'], country: 'United Kingdom', countryFlag: '🇬🇧',
    hq: 'London, UK', founded: 1845, employees: '457,000+', revenue: '$64.9B (2023)',
    description: 'Deloitte es la mayor red de servicios profesionales del mundo por ingresos. Opera en 150+ países ofreciendo auditoría, consultoría, asesoría fiscal y financiera.',
    services: ['Audit & Assurance', 'Consulting', 'Tax', 'Financial Advisory', 'Risk Advisory'],
    website: 'deloitte.com',
  },
  {
    id: 'ey', name: 'Ernst & Young', logo: '/logos/ey.png', color: '#FFE600',
    groups: ['big4', 'consulting'], country: 'United Kingdom', countryFlag: '🇬🇧',
    hq: 'London, UK', founded: 1989, employees: '395,000+', revenue: '$49.4B (2023)',
    description: 'EY es líder global en aseguramiento, consultoría, estrategia, impuestos y transacciones. Ayuda a las organizaciones a construir un mejor mundo de negocios en 150+ países.',
    services: ['Assurance', 'Consulting', 'Strategy & Transactions', 'Tax', 'Technology Risk'],
    website: 'ey.com',
  },
  {
    id: 'kpmg', name: 'KPMG', logo: '/logos/kpmg.png', color: '#00338D',
    groups: ['big4', 'consulting'], country: 'Netherlands', countryFlag: '🇳🇱',
    hq: 'Amstelveen, Netherlands', founded: 1987, employees: '273,000+', revenue: '$36B (2023)',
    description: 'KPMG es una red global de firmas que brindan servicios de auditoría, impuestos y asesoría en 147 países, ayudando a organizaciones a enfrentar desafíos regulatorios y de negocio.',
    services: ['Audit', 'Tax & Legal', 'Deal Advisory', 'Management Consulting', 'Technology Advisory'],
    website: 'kpmg.com',
  },

  /* ══ CONSULTING — Big 3 ══ */
  {
    id: 'mckinsey', name: 'McKinsey & Company', logo: '/logos/mckinsey.png', color: '#003087',
    groups: ['big3', 'consulting'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'New York, USA', founded: 1926, employees: '45,000+', revenue: '$16B est. (2023)',
    description: 'McKinsey & Company es la consultora de gestión más prestigiosa del mundo, asesorando a las principales corporaciones, gobiernos e instituciones en estrategia, operaciones y transformación.',
    services: ['Strategy Consulting', 'Digital Transformation', 'Operations', 'Organization Design', 'M&A Advisory'],
    website: 'mckinsey.com',
  },
  {
    id: 'bcg', name: 'Boston Consulting Group', logo: '/logos/bcg.png', color: '#00A850',
    groups: ['big3', 'consulting'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'Boston, USA', founded: 1963, employees: '32,000+', revenue: '$12B est. (2023)',
    description: 'BCG es una consultora global de gestión pionera en estrategia corporativa, reconocida por su innovación, transformación digital y capacidad de generar valor en todos los sectores.',
    services: ['Corporate Strategy', 'Digital & Technology', 'Operations', 'People & Organization', 'Sustainability'],
    website: 'bcg.com',
  },
  {
    id: 'bain', name: 'Bain & Company', logo: '/logos/bain.png', color: '#CC0000',
    groups: ['big3', 'consulting'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'Boston, USA', founded: 1973, employees: '12,000+', revenue: '$6B est. (2023)',
    description: 'Bain & Company trabaja junto a sus clientes para lograr resultados que importan. Reconocida por su profunda especialización en private equity, retail y tecnología a nivel global.',
    services: ['Strategy', 'Private Equity', 'Mergers & Acquisitions', 'Customer Insights', 'Advanced Analytics'],
    website: 'bain.com',
  },

  /* ══ CONSULTING — Other ══ */
  {
    id: 'accenture', name: 'Accenture', logo: '/logos/accenture.png', color: '#A100FF',
    groups: ['consulting'], country: 'Ireland', countryFlag: '🇮🇪',
    hq: 'Dublin, Ireland', founded: 1989, employees: '774,000+', revenue: '$64.1B (FY2023)',
    description: 'Accenture es una empresa global de servicios profesionales líder en capacidades digitales, cloud y ciberseguridad, sirviendo a clientes en 120+ países con expertise sectorial profundo.',
    services: ['Technology Consulting', 'Cloud Services', 'Cybersecurity', 'Digital Transformation', 'Business Process Outsourcing'],
    website: 'accenture.com',
  },
  {
    id: 'oliver-wyman', name: 'Oliver Wyman', logo: '/logos/oliver-wyman.png', color: '#003087',
    groups: ['consulting'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'New York, USA', founded: 1984, employees: '7,000+', revenue: '$3B est. (2023)',
    description: 'Oliver Wyman es líder global en consultoría de gestión especializada en servicios financieros, incluyendo banca, seguros y estrategia de asset management.',
    services: ['Financial Services Strategy', 'Risk Management', 'Actuarial Services', 'Operations', 'Corporate Finance'],
    website: 'oliverwyman.com',
  },

  /* ══ GLOBAL BANKS ══ */
  {
    id: 'jpmorgan', name: 'JPMorgan Chase', logo: '/logos/jpmorgan.png', color: '#117ACA',
    groups: ['global-banks'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'New York, USA', founded: 1799, employees: '308,000+', revenue: '$158.1B (2023)',
    description: 'JPMorgan Chase es el banco más grande de EE.UU. y una de las instituciones financieras más sistémicamente importantes del mundo, operando en banca de inversión, banca comercial y gestión de activos.',
    services: ['Investment Banking', 'Commercial Banking', 'Retail Banking', 'Asset Management', 'Treasury Services'],
    website: 'jpmorganchase.com',
  },
  {
    id: 'bofa', name: 'Bank of America', logo: '/logos/bank-of-america.png', color: '#E31837',
    groups: ['global-banks'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'Charlotte, USA', founded: 1904, employees: '213,000+', revenue: '$101.9B (2023)',
    description: 'Bank of America es una de las instituciones financieras líderes del mundo, atendiendo a consumidores, PyMEs y grandes corporaciones con una gama completa de productos bancarios y de inversión.',
    services: ['Consumer Banking', 'Global Markets', 'Global Banking', 'Investment Banking', 'Wealth Management'],
    website: 'bankofamerica.com',
  },
  {
    id: 'citi', name: 'Citigroup', logo: '/logos/citi.png', color: '#003B70',
    groups: ['global-banks'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'New York, USA', founded: 1812, employees: '240,000+', revenue: '$78.7B (2023)',
    description: 'Citi es un holding financiero global diversificado que provee productos y servicios financieros a consumidores, corporaciones, gobiernos e instituciones en 160+ países.',
    services: ['Institutional Clients Group', 'Personal Banking', 'Wealth Management', 'Markets', 'Treasury & Trade Solutions'],
    website: 'citigroup.com',
  },
  {
    id: 'wells-fargo', name: 'Wells Fargo', logo: '/logos/wells-fargo.png', color: '#D71E28',
    groups: ['global-banks'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'San Francisco, USA', founded: 1852, employees: '226,000+', revenue: '$82.6B (2023)',
    description: 'Wells Fargo es un banco diversificado con $1.9T en activos, brindando servicios de banca, inversión, hipotecas y finanzas al consumidor en EE.UU. y a nivel global.',
    services: ['Consumer Banking', 'Commercial Banking', 'Corporate Banking', 'Investment Banking', 'Wealth Management'],
    website: 'wellsfargo.com',
  },
  {
    id: 'hsbc', name: 'HSBC', logo: '/logos/hsbc.png', color: '#DB0011',
    groups: ['global-banks'], country: 'United Kingdom', countryFlag: '🇬🇧',
    hq: 'London, UK', founded: 1865, employees: '220,000+', revenue: '$66.1B (2023)',
    description: 'HSBC es una de las organizaciones bancarias y de servicios financieros más grandes del mundo, conectando a clientes con oportunidades en Asia, Europa, América y Medio Oriente.',
    services: ['Retail Banking', 'Wealth & Personal Banking', 'Commercial Banking', 'Global Banking & Markets', 'Trade Finance'],
    website: 'hsbc.com',
  },
  {
    id: 'barclays', name: 'Barclays', logo: '/logos/barclays.png', color: '#00AEEF',
    groups: ['global-banks'], country: 'United Kingdom', countryFlag: '🇬🇧',
    hq: 'London, UK', founded: 1690, employees: '95,000+', revenue: '$30.1B (2023)',
    description: 'Barclays es un banco universal multinacional británico con más de 330 años de historia, ofreciendo banca retail, corporativa, de inversión y gestión patrimonial en 40+ países.',
    services: ['Investment Banking', 'Corporate Banking', 'Retail Banking', 'Credit Cards', 'Wealth Management'],
    website: 'barclays.com',
  },
  {
    id: 'deutsche', name: 'Deutsche Bank', logo: '/logos/deutsche-bank.png', color: '#0018A8',
    groups: ['global-banks'], country: 'Germany', countryFlag: '🇩🇪',
    hq: 'Frankfurt, Germany', founded: 1870, employees: '90,000+', revenue: '$28.9B (2023)',
    description: 'Deutsche Bank es el mayor banco de Alemania y una de las instituciones financieras más importantes de Europa, con posiciones sólidas en banca de inversión, corporativa y gestión de activos.',
    services: ['Investment Banking', 'Corporate Banking', 'Private Banking', 'Asset Management', 'Transaction Banking'],
    website: 'db.com',
  },
  {
    id: 'ubs', name: 'UBS', logo: '/logos/ubs.png', color: '#E60000',
    groups: ['global-banks'], country: 'Switzerland', countryFlag: '🇨🇭',
    hq: 'Zurich, Switzerland', founded: 1862, employees: '109,000+', revenue: '$35.6B (2023)',
    description: 'UBS es el mayor gestor de patrimonio del mundo, brindando asesoría financiera y soluciones a clientes privados, institucionales y corporativos, incluyendo Credit Suisse tras su adquisición.',
    services: ['Global Wealth Management', 'Investment Bank', 'Asset Management', 'Personal & Corporate Banking', 'Capital Markets'],
    website: 'ubs.com',
  },

  /* ══ INVESTMENT ══ */
  {
    id: 'goldman', name: 'Goldman Sachs', logo: '/logos/goldman-sachs.png', color: '#1a6fa8',
    groups: ['investment', 'global-banks'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'New York, USA', founded: 1869, employees: '45,000+', revenue: '$46.3B (2023)',
    description: 'Goldman Sachs es un banco de inversión global líder, reconocido por su rol en M&A, IPOs, trading y gestión de activos, asesorando a gobiernos y corporaciones líderes del mundo.',
    services: ['Investment Banking', 'Global Markets', 'Asset Management', 'Consumer & Wealth', 'M&A Advisory'],
    website: 'goldmansachs.com',
  },
  {
    id: 'morgan-s', name: 'Morgan Stanley', logo: '/logos/morgan-stanley.png', color: '#003370',
    groups: ['investment', 'global-banks'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'New York, USA', founded: 1935, employees: '80,000+', revenue: '$54.1B (2023)',
    description: 'Morgan Stanley es una firma líder de servicios financieros globales que provee banca de inversión, valores, gestión patrimonial e inversiones a clientes en todo el mundo.',
    services: ['Institutional Securities', 'Wealth Management', 'Investment Management', 'Sales & Trading', 'Equity Research'],
    website: 'morganstanley.com',
  },
  {
    id: 'blackrock', name: 'BlackRock', logo: '/logos/blackrock.png', color: '#111111',
    groups: ['investment'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'New York, USA', founded: 1988, employees: '20,000+', aum: '$10T+',
    description: 'BlackRock es el gestor de activos más grande del mundo con más de $10 billones en AUM, brindando gestión de inversiones, gestión de riesgos y servicios de asesoría a nivel global.',
    services: ['ETF & Index Investing', 'Active Equity', 'Fixed Income', 'Multi-Asset', 'Alternatives'],
    website: 'blackrock.com',
  },
  {
    id: 'blackstone', name: 'Blackstone', logo: '/logos/blackstone.png', color: '#111111',
    groups: ['investment'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'New York, USA', founded: 1985, employees: '4,700+', aum: '$1T+',
    description: 'Blackstone es la firma de gestión de activos alternativos más grande del mundo, con $1 billón en AUM en estrategias de private equity, real estate, crédito y fondos de cobertura.',
    services: ['Private Equity', 'Real Estate', 'Hedge Fund Solutions', 'Credit & Insurance', 'Infrastructure'],
    website: 'blackstone.com',
  },
  {
    id: 'vanguard', name: 'Vanguard', logo: '/logos/vanguard.png', color: '#811830',
    groups: ['investment'], country: 'United States', countryFlag: '🇺🇸',
    hq: 'Malvern, USA', founded: 1975, employees: '20,000+', aum: '$8T+',
    description: 'Vanguard es el segundo gestor de activos más grande del mundo y pionero de la inversión indexada, reconocido por sus fondos mutuos y ETFs de bajo costo para más de 50 millones de inversores.',
    services: ['Index Funds', 'ETFs', 'Retirement Accounts', 'Financial Planning', 'Institutional Investing'],
    website: 'vanguard.com',
  },

  /* ══ PERÚ — Banca Múltiple ══ */
  {
    id: 'bcp', name: 'Banco de Crédito del Perú', logo: '/logos/bcp.svg', color: '#003876', monogram: 'BCP',
    groups: ['peru', 'peru-commercial'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 1889, employees: '28,000+',
    description: 'El BCP es el banco más grande del Perú y principal del grupo Credicorp. Ofrece una amplia gama de productos financieros a personas, empresas y corporaciones en todo el país.',
    services: ['Banca Personal', 'Banca Empresarial', 'Banca Corporativa', 'Seguros', 'Inversiones'],
    website: 'viabcp.com',
  },
  {
    id: 'bbva-pe', name: 'BBVA Perú', logo: '/logos/bbva.svg', color: '#004481', monogram: 'BBVA',
    groups: ['peru', 'peru-commercial'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 1951, employees: '7,000+',
    description: 'BBVA Perú es el segundo banco más grande del país, subsidiaria del grupo español BBVA. Líder en transformación digital y banca sostenible en el mercado peruano.',
    services: ['Banca Personal', 'Banca de Empresas', 'Banca Corporativa', 'Banca Digital', 'Gestión de Activos'],
    website: 'bbva.pe',
  },
  {
    id: 'scotiabank-pe', name: 'Scotiabank Perú', logo: '/logos/scotiabank.svg', color: '#EC111A', monogram: 'BNS',
    groups: ['peru', 'peru-commercial'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 1943, employees: '6,000+',
    description: 'Scotiabank Perú es subsidiaria del Bank of Nova Scotia (Canadá). Ofrece soluciones financieras integrales para personas y empresas con fuerte vocación de servicio al cliente.',
    services: ['Banca Personas', 'Banca Empresarial', 'Banca Corporativa', 'Comercio Exterior', 'Leasing'],
    website: 'scotiabank.com.pe',
  },
  {
    id: 'interbank', name: 'Interbank', logo: '/logos/interbank.svg', color: '#00B140', monogram: 'IB',
    groups: ['peru', 'peru-commercial'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 1897, employees: '8,000+',
    description: 'Interbank pertenece al grupo Intercorp y es reconocido como el banco más innovador del Perú, líder en experiencia digital y atención al cliente a nivel nacional.',
    services: ['Banca Personal', 'Banca Empresarial', 'Préstamos', 'Tarjetas de Crédito', 'Banca Digital'],
    website: 'interbank.pe',
  },
  {
    id: 'banbif', name: 'BanBif', logo: '/logos/banbif.svg', color: '#004A97', monogram: 'BBF',
    groups: ['peru', 'peru-commercial'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 1991, employees: '3,500+',
    description: 'BanBif es el quinto banco más grande del Perú por activos, con fuerte presencia en banca empresarial, comercio exterior y financiamiento de proyectos de inversión.',
    services: ['Banca Personal', 'Banca Empresarial', 'Comercio Exterior', 'Leasing', 'Factoring'],
    website: 'banbif.com.pe',
  },
  {
    id: 'mibanco', name: 'Mibanco', logo: '/logos/mibanco.png', color: '#E4002B', monogram: 'mi',
    groups: ['peru', 'peru-commercial'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 1998, employees: '14,000+',
    description: 'Mibanco es el banco líder en microfinanzas del Perú y uno de los más grandes de América Latina en este segmento. Parte del grupo Credicorp, impulsa la inclusión financiera.',
    services: ['Microcréditos', 'Créditos MYPE', 'Cuentas de Ahorro', 'Seguros Microfinanzas', 'Inclusión Financiera'],
    website: 'mibanco.com.pe',
  },
  {
    id: 'pichincha-pe', name: 'Banco Pichincha', logo: '/logos/pichincha.svg', color: '#8B0000', monogram: 'BP',
    groups: ['peru', 'peru-commercial'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 2007, employees: '2,000+',
    description: 'Banco Pichincha Perú es subsidiaria del Banco Pichincha de Ecuador, el banco privado más grande de ese país. Enfocado en banca personal y MYPE en el mercado peruano.',
    services: ['Banca Personal', 'Banca MYPE', 'Créditos Vehiculares', 'Tarjetas de Crédito', 'Depósitos'],
    website: 'bancopichincha.com.pe',
  },
  {
    id: 'falabella-pe', name: 'Banco Falabella', logo: '/logos/falabella.svg', color: '#006341', monogram: 'BF',
    groups: ['peru', 'peru-commercial'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 2007, employees: '3,000+',
    description: 'Banco Falabella Perú es la entidad financiera del grupo Falabella, especializada en créditos de consumo, tarjeta CMR y financiamiento retail para clientes de sus tiendas.',
    services: ['Tarjeta CMR', 'Créditos de Consumo', 'Cuentas de Ahorro', 'Seguros', 'Créditos Hipotecarios'],
    website: 'bancofalabella.com.pe',
  },
  {
    id: 'ripley-pe', name: 'Banco Ripley', logo: '/logos/ripley.png', color: '#9B1A8C', monogram: 'BR',
    groups: ['peru', 'peru-commercial'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 1997, employees: '2,500+',
    description: 'Banco Ripley Perú pertenece al grupo Ripley, especializado en créditos de consumo y tarjeta Ripley, con fuerte presencia en el segmento retail a nivel nacional.',
    services: ['Tarjeta Ripley', 'Créditos Personales', 'Cuentas de Ahorro', 'Créditos Automotrices', 'Seguros'],
    website: 'bancoripley.com.pe',
  },
  {
    id: 'gnb', name: 'Banco GNB Perú', logo: '/logos/gnb.png', color: '#003F7E', monogram: 'GNB',
    groups: ['peru', 'peru-commercial'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 2013, employees: '1,200+',
    description: 'Banco GNB Perú es subsidiaria del Grupo Gilinski (Colombia), con enfoque en banca corporativa, empresarial y banca privada para segmentos de alto valor patrimonial.',
    services: ['Banca Corporativa', 'Banca Empresarial', 'Banca Privada', 'Comercio Exterior', 'Mercado de Capitales'],
    website: 'gnbperu.com',
  },
  {
    id: 'alfin', name: 'Alfin Banco', logo: '/logos/alfin.svg', color: '#00A0D2', monogram: 'AB',
    groups: ['peru', 'peru-commercial'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 2002, employees: '800+',
    description: 'Alfin Banco (ex Banco Azteca Perú) está enfocado en la banca de consumo masivo e inclusión financiera, atendiendo principalmente a los segmentos C y D del mercado peruano.',
    services: ['Créditos de Consumo', 'Cuentas de Ahorro', 'Seguros', 'Remesas', 'Pago de Servicios'],
    website: 'alfinbanco.pe',
  },
  {
    id: 'b-comercio', name: 'Banco de Comercio', logo: '/logos/banco-comercio.jpg', color: '#004A97', monogram: 'BC',
    groups: ['peru', 'peru-commercial'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 1967, employees: '1,000+',
    description: 'Banco de Comercio es una entidad financiera peruana vinculada a las fuerzas armadas y policiales, orientada a banca personal, préstamos y depósitos para sus segmentos objetivo.',
    services: ['Banca Personal', 'Préstamos', 'Depósitos', 'Cuenta Sueldo', 'Seguros'],
    website: 'bancomercio.com.pe',
  },

  /* ══ PERÚ — Bancos Estatales ══ */
  {
    id: 'bn', name: 'Banco de la Nación', logo: '/logos/banco-nacion.png', color: '#006B3C', monogram: 'BN',
    groups: ['peru', 'peru-state'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 1966, employees: '6,000+',
    description: 'El Banco de la Nación es el banco estatal del Perú, responsable de servicios financieros al Estado y de promover la bancarización en zonas alejadas donde la banca privada no tiene presencia.',
    services: ['Recaudación Tributaria', 'Pagaduría del Estado', 'Créditos a Servidores Públicos', 'Remesas', 'Bancarización Rural'],
    website: 'bn.com.pe',
  },
  {
    id: 'agrobanco', name: 'Agrobanco', logo: '/logos/agrobanco.svg', color: '#4CAF50', monogram: 'AB',
    groups: ['peru', 'peru-state'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 2002, employees: '800+',
    description: 'Agrobanco es el banco estatal de fomento agropecuario del Perú, enfocado en el financiamiento de pequeños y medianos agricultores y comunidades rurales para impulsar el sector agrario nacional.',
    services: ['Créditos Agrarios', 'Créditos Pecuarios', 'Créditos Forestales', 'Asistencia Técnica', 'Cadenas Productivas'],
    website: 'agrobanco.com.pe',
  },

  /* ══ PERÚ — Cajas Municipales ══ */
  {
    id: 'c-arequipa', name: 'Caja Arequipa', logo: '/logos/caja-arequipa.svg', color: '#D62B2B', monogram: 'CA',
    groups: ['peru', 'peru-cajas'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Arequipa, Perú', founded: 1986, employees: '5,000+',
    description: 'La Caja Municipal de Arequipa es la caja municipal más grande del Perú y líder en microfinanzas, con cobertura nacional y enfoque en el financiamiento de la pequeña y mediana empresa.',
    services: ['Microcréditos', 'Créditos MYPE', 'Ahorros', 'Créditos Hipotecarios', 'Seguros'],
    website: 'cajaarequipa.pe',
  },
  {
    id: 'c-huancayo', name: 'Caja Huancayo', logo: '/logos/caja-huancayo.png', color: '#004A97', monogram: 'CH',
    groups: ['peru', 'peru-cajas'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Huancayo, Perú', founded: 1988, employees: '3,500+',
    description: 'Caja Huancayo es una de las cajas municipales más rentables del sistema peruano, con fuerte presencia en la sierra central y enfoque en microempresarios y familias de la región.',
    services: ['Créditos MYPE', 'Créditos de Consumo', 'Depósitos de Ahorro', 'CTS', 'Seguros'],
    website: 'cajahuancayo.com.pe',
  },
  {
    id: 'c-sullana', name: 'Caja Sullana', logo: '', color: '#006341', monogram: 'CS',
    groups: ['peru', 'peru-cajas'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Sullana, Perú', founded: 1986, employees: '2,500+',
    description: 'Caja Sullana es una de las cajas municipales más antiguas del Perú, con presencia en el norte del país y especializada en microfinanzas y créditos para pequeñas empresas.',
    services: ['Microcréditos', 'Créditos Empresariales', 'Ahorros', 'CTS', 'Créditos de Consumo'],
    website: 'cajasullana.pe',
  },
  {
    id: 'c-cusco', name: 'Caja Cusco', logo: '', color: '#8B4000', monogram: 'CC',
    groups: ['peru', 'peru-cajas'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Cusco, Perú', founded: 1988, employees: '2,000+',
    description: 'Caja Cusco atiende principalmente la región sur del Perú, con enfoque en el financiamiento de microempresarios, artesanos y agricultores de la región andina del Cusco.',
    services: ['Créditos MYPE', 'Créditos Agrarios', 'Ahorros', 'Remesas', 'Seguros'],
    website: 'cmac-cusco.com.pe',
  },
  {
    id: 'c-piura', name: 'Caja Piura', logo: '/logos/caja-piura.webp', color: '#FF6B00', monogram: 'CP',
    groups: ['peru', 'peru-cajas'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Piura, Perú', founded: 1982, employees: '3,000+',
    description: 'CMAC Piura fue la primera caja municipal creada en el Perú (1982), pionera del sistema de microfinanzas peruano. Tiene cobertura nacional y fuerte presencia en la costa norte.',
    services: ['Microcréditos', 'Créditos Empresariales', 'Ahorros', 'CTS', 'Operaciones de Cambio'],
    website: 'cajapiura.com.pe',
  },
  {
    id: 'c-trujillo', name: 'Caja Trujillo', logo: '', color: '#FFD700', monogram: 'CT',
    groups: ['peru', 'peru-cajas'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Trujillo, Perú', founded: 1984, employees: '1,500+',
    description: 'Caja Trujillo tiene presencia en la región La Libertad y noreste del Perú, financiando el desarrollo de micro y pequeñas empresas locales con productos adaptados a la región.',
    services: ['Créditos MYPE', 'Créditos de Consumo', 'Depósitos', 'CTS', 'Leasing'],
    website: 'cmactrujillo.com.pe',
  },
  {
    id: 'c-ica', name: 'Caja Ica', logo: '', color: '#004A97', monogram: 'CI',
    groups: ['peru', 'peru-cajas'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Ica, Perú', founded: 1989, employees: '900+',
    description: 'Caja Ica atiende la región Ica y zonas aledañas de la costa sur peruana, con enfoque en el financiamiento de la actividad agroindustrial, pesquera y MYPE de la zona.',
    services: ['Créditos Agrarios', 'Créditos MYPE', 'Ahorros', 'Créditos de Consumo', 'CTS'],
    website: 'cajaica.com.pe',
  },
  {
    id: 'c-tacna', name: 'Caja Tacna', logo: '', color: '#003087', monogram: 'CT',
    groups: ['peru', 'peru-cajas'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Tacna, Perú', founded: 1992, employees: '700+',
    description: 'Caja Tacna brinda servicios financieros en la región fronteriza de Tacna, con atención especial a micro y pequeños empresarios del extremo sur del Perú.',
    services: ['Microcréditos', 'Ahorros', 'Créditos de Consumo', 'CTS', 'Remesas'],
    website: 'cajatacna.com.pe',
  },
  {
    id: 'c-maynas', name: 'Caja Maynas', logo: '', color: '#1B5E20', monogram: 'CM',
    groups: ['peru', 'peru-cajas'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Iquitos, Perú', founded: 1986, employees: '500+',
    description: 'Caja Maynas opera en la Amazonía peruana (Loreto), con cobertura en zonas de difícil acceso fluvial, promoviendo activamente la inclusión financiera en la selva del Perú.',
    services: ['Microcréditos', 'Créditos MYPE', 'Ahorros', 'Remesas', 'Seguros'],
    website: 'cajamaynas.pe',
  },
  {
    id: 'c-santa', name: 'Caja Del Santa', logo: '/logos/caja-santa.png', color: '#00838F', monogram: 'CS',
    groups: ['peru', 'peru-cajas'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Chimbote, Perú', founded: 1986, employees: '400+',
    description: 'Caja Del Santa atiende la zona de Áncash y el norte peruano, con enfoque en el financiamiento pesquero, industrial y de pequeñas empresas de la región de Chimbote.',
    services: ['Créditos MYPE', 'Créditos de Consumo', 'Ahorros', 'CTS', 'Depósitos a Plazo'],
    website: 'cajadelsanta.pe',
  },
  {
    id: 'c-metro', name: 'Caja Metropolitana', logo: '', color: '#BF360C', monogram: 'CM',
    groups: ['peru', 'peru-cajas'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Lima, Perú', founded: 1987, employees: '600+',
    description: 'Caja Metropolitana de Lima es la única caja municipal con sede en Lima, especializada en créditos pignoraticios (préstamos con garantía de joyas) y financiamiento MYPE en la capital.',
    services: ['Créditos Pignoraticios', 'Créditos MYPE', 'Ahorros', 'Depósitos a Plazo', 'Seguros'],
    website: 'cajametropolitana.pe',
  },
  {
    id: 'c-paita', name: 'Caja Paita', logo: '/logos/caja-paita.png', color: '#1565C0', monogram: 'CP',
    groups: ['peru', 'peru-cajas'], country: 'Perú', countryFlag: '🇵🇪',
    hq: 'Paita, Perú', founded: 1994, employees: '300+',
    description: 'Caja Paita es la caja municipal más pequeña del sistema peruano, con presencia en la región Piura y orientada al financiamiento de micro y pequeñas empresas portuarias y pesqueras.',
    services: ['Microcréditos', 'Créditos MYPE', 'Ahorros', 'CTS', 'Créditos de Consumo'],
    website: 'cajapaita.pe',
  },
]

export const STATS = {
  totalCompanies: COMPANIES.length,
  globalCompanies: COMPANIES.filter(c => !c.groups.includes('peru')).length,
  peruCompanies: COMPANIES.filter(c => c.groups.includes('peru')).length,
  totalAUM: '$20T+',
  countries: [...new Set(COMPANIES.map(c => c.country))].length,
}
