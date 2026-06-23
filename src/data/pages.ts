// Static content pages (company + legal), localized in Thai / English / Chinese.
// Missing locales fall back to Thai. Language is held in the app store (no locale
// in the URL).

import type { Locale } from '@/store/useAppStore'

export interface PageSection {
  heading?: string
  paragraphs?: string[]
  list?: string[]
}

export interface ContentPageData {
  title: string
  description: string
  /** Last-updated date (label is localized separately), shown on legal pages. */
  updated?: string
  sections: PageSection[]
}

/** A page's content: Thai is required; en/zh optional (fall back to th). */
type LocalizedPage = { th: ContentPageData } & Partial<Record<Locale, ContentPageData>>

const UPDATED = { th: '24 มิถุนายน 2026', en: '24 June 2026', zh: '2026年6月24日' }

const PAGES: Record<string, LocalizedPage> = {
  about: {
    th: {
      title: 'เกี่ยวกับเรา',
      description:
        'LuminaSky คือสตูดิโอออกแบบและควบคุมการแสดงโดรนแสงสีระดับโลกในประเทศไทย ผสานเทคโนโลยี ความปลอดภัย และการเล่าเรื่องเข้าด้วยกัน',
      sections: [
        {
          heading: 'เราคือใคร',
          paragraphs: [
            'LuminaSky เป็นทีมนักออกแบบโชว์ วิศวกร และโปรดิวเซอร์ที่หลงใหลในการเนรมิตท้องฟ้ายามค่ำคืนให้กลายเป็นผืนผ้าใบ เราดูแลงานตั้งแต่แนวคิด การออกแบบ Choreography 3D ไปจนถึงการบินจริงในวันงาน',
            'เราเชื่อว่าการแสดงที่ดีไม่ใช่แค่ภาพสวย แต่คือประสบการณ์ที่ผู้ชมจดจำและอยากบอกต่อ',
          ],
        },
        {
          heading: 'สิ่งที่เรายึดถือ',
          list: [
            'ความปลอดภัยมาก่อนเสมอ — บินตามมาตรฐานและได้รับอนุญาตอย่างถูกต้อง',
            'งานออกแบบเฉพาะตัว ไม่ใช้เทมเพลตสำเร็จรูป',
            'ทีมงานมืออาชีพพร้อมระบบสำรองเต็มรูปแบบ',
          ],
        },
      ],
    },
    en: {
      title: 'About Us',
      description:
        'LuminaSky is a studio designing and operating world-class drone light shows in Thailand — blending technology, safety, and storytelling.',
      sections: [
        {
          heading: 'Who we are',
          paragraphs: [
            'LuminaSky is a team of show designers, engineers, and producers passionate about turning the night sky into a canvas. We handle everything from concept and 3D choreography through to live flight on show day.',
            'We believe a great show isn’t just a beautiful picture — it’s an experience the audience remembers and wants to share.',
          ],
        },
        {
          heading: 'What we stand for',
          list: [
            'Safety always comes first — flying to standard and fully licensed',
            'Bespoke design, never off-the-shelf templates',
            'A professional team with full backup systems',
          ],
        },
      ],
    },
    zh: {
      title: '关于我们',
      description: 'LuminaSky 是一家在泰国设计并执行世界级无人机灯光秀的工作室,融合技术、安全与叙事。',
      sections: [
        {
          heading: '我们是谁',
          paragraphs: [
            'LuminaSky 由一群热爱将夜空化作画布的演出设计师、工程师与制作人组成。从创意构思、3D 编排到演出当天的实际飞行,我们全程负责。',
            '我们相信,优秀的演出不仅是一幅美丽的画面,更是一段让观众铭记并愿意分享的体验。',
          ],
        },
        {
          heading: '我们坚持的理念',
          list: ['安全永远第一——按标准飞行并持有正式许可', '量身定制的设计,绝不使用现成模板', '专业团队配备完整的备份系统'],
        },
      ],
    },
  },
  press: {
    th: {
      title: 'ข่าวสารและสื่อมวลชน',
      description: 'ข้อมูลสำหรับสื่อมวลชน ชุดข้อมูลข่าว (press kit) และช่องทางติดต่อฝ่ายประชาสัมพันธ์ของ LuminaSky',
      sections: [
        {
          heading: 'ติดต่อฝ่ายสื่อสารองค์กร',
          paragraphs: [
            'สำหรับการสัมภาษณ์ ขอข้อมูล หรือขอภาพประกอบข่าว กรุณาติดต่อทีมประชาสัมพันธ์ของเราที่ press@luminasky.show เราจะตอบกลับภายใน 2 วันทำการ',
          ],
        },
        {
          heading: 'ชุดข้อมูลข่าว (Press Kit)',
          list: ['โลโก้และแนวทางการใช้แบรนด์', 'ภาพถ่ายและวิดีโอความละเอียดสูงจากงานที่ผ่านมา', 'ข้อมูลบริษัทและประวัติผู้บริหาร'],
        },
      ],
    },
    en: {
      title: 'Press & Media',
      description: 'Information for media, our press kit, and how to reach the LuminaSky communications team.',
      sections: [
        {
          heading: 'Media enquiries',
          paragraphs: [
            'For interviews, information, or press imagery, please contact our communications team at press@luminasky.show. We respond within two business days.',
          ],
        },
        {
          heading: 'Press kit',
          list: ['Logos and brand guidelines', 'High-resolution photos and video from past shows', 'Company information and executive bios'],
        },
      ],
    },
    zh: {
      title: '新闻与媒体',
      description: '面向媒体的信息、新闻资料包,以及联系 LuminaSky 传讯团队的方式。',
      sections: [
        {
          heading: '媒体咨询',
          paragraphs: ['如需采访、资料或新闻配图,请通过 press@luminasky.show 联系我们的传讯团队。我们会在两个工作日内回复。'],
        },
        {
          heading: '新闻资料包',
          list: ['标志与品牌规范', '过往演出的高清照片与视频', '公司信息与高管简介'],
        },
      ],
    },
  },
  careers: {
    th: {
      title: 'ร่วมงานกับเรา',
      description: 'มาร่วมเป็นส่วนหนึ่งของทีมที่เนรมิตท้องฟ้ายามค่ำคืน — ตำแหน่งงานที่เปิดรับและวัฒนธรรมการทำงานของ LuminaSky',
      sections: [
        {
          heading: 'ทำไมต้อง LuminaSky',
          paragraphs: [
            'เรามองหาคนที่ใส่ใจรายละเอียด รักการเรียนรู้ และอยากสร้างประสบการณ์ที่ไม่เหมือนใคร ที่นี่คุณจะได้ทำงานกับเทคโนโลยีล้ำสมัยและทีมที่ให้คุณค่ากับความคิดสร้างสรรค์',
          ],
        },
        {
          heading: 'ตำแหน่งที่เปิดรับ',
          list: [
            'Show Designer / Choreographer',
            'Drone Pilot (มีใบอนุญาต กพท. จะพิจารณาเป็นพิเศษ)',
            'Producer / Project Manager',
            'Motion / Visual Designer',
          ],
        },
        {
          heading: 'สนใจสมัคร',
          paragraphs: ['ส่งประวัติและผลงานมาที่ careers@luminasky.show เราพิจารณาทุกใบสมัครและจะติดต่อกลับหากโปรไฟล์ตรงกับตำแหน่ง'],
        },
      ],
    },
    en: {
      title: 'Careers',
      description: 'Join the team that paints the night sky — open roles and the culture at LuminaSky.',
      sections: [
        {
          heading: 'Why LuminaSky',
          paragraphs: [
            'We look for people who care about the details, love to learn, and want to create something unlike anything else. Here you’ll work with cutting-edge technology and a team that values creativity.',
          ],
        },
        {
          heading: 'Open positions',
          list: [
            'Show Designer / Choreographer',
            'Drone Pilot (CAAT licence a strong plus)',
            'Producer / Project Manager',
            'Motion / Visual Designer',
          ],
        },
        {
          heading: 'How to apply',
          paragraphs: [
            'Send your CV and portfolio to careers@luminasky.show. We review every application and will get in touch if your profile fits the role.',
          ],
        },
      ],
    },
    zh: {
      title: '加入我们',
      description: '加入点亮夜空的团队——LuminaSky 的招聘职位与工作文化。',
      sections: [
        {
          heading: '为什么选择 LuminaSky',
          paragraphs: ['我们寻找注重细节、热爱学习、并渴望创造与众不同体验的人。在这里,你将使用前沿技术,与重视创意的团队共事。'],
        },
        {
          heading: '开放职位',
          list: ['演出设计师 / 编排师', '无人机飞手(持有 CAAT 执照者优先)', '制作人 / 项目经理', '动效 / 视觉设计师'],
        },
        {
          heading: '如何申请',
          paragraphs: ['请将简历和作品集发送至 careers@luminasky.show。我们会审阅每一份申请,如与职位匹配将主动联系您。'],
        },
      ],
    },
  },
  safety: {
    th: {
      title: 'มาตรฐานความปลอดภัย',
      description: 'แนวปฏิบัติด้านความปลอดภัยในการแสดงโดรนของ LuminaSky ตั้งแต่การวางแผน การซ้อม ไปจนถึงการบินจริง',
      sections: [
        {
          heading: 'ความปลอดภัยคือหัวใจ',
          paragraphs: [
            'ทุกการแสดงผ่านการประเมินความเสี่ยงและวางแผนพื้นที่บินอย่างละเอียด เรากำหนดเขตปลอดภัย ระยะห่างจากผู้ชม และแผนรับมือเหตุฉุกเฉินไว้ล่วงหน้าเสมอ',
          ],
        },
        {
          heading: 'มาตรการหลัก',
          list: [
            'ตรวจสอบสภาพอากาศและความเร็วลมก่อนบินทุกครั้ง',
            'ระบบ Geofencing และ Fail-safe กลับฐานอัตโนมัติ',
            'โดรนสำรองและทีมเทคนิคพร้อมตลอดการแสดง',
            'ประกันภัยครอบคลุมงานอีเวนต์',
          ],
        },
      ],
    },
    en: {
      title: 'Safety Standards',
      description: "LuminaSky's safety practices for every drone show — from planning and rehearsal through to live flight.",
      sections: [
        {
          heading: 'Safety is at the core',
          paragraphs: [
            'Every show goes through a detailed risk assessment and flight-area plan. We define safety zones, audience clearances, and emergency procedures well in advance of show day.',
          ],
        },
        {
          heading: 'Key measures',
          list: [
            'Weather and wind-speed checks before every flight',
            'Geofencing and automatic fail-safe return-to-home',
            'Backup drones and a technical crew on standby throughout the show',
            'Event insurance coverage',
          ],
        },
      ],
    },
    zh: {
      title: '安全标准',
      description: 'LuminaSky 在每一场无人机表演中的安全规范——从策划、彩排到现场飞行。',
      sections: [
        {
          heading: '安全是核心',
          paragraphs: ['每场演出都会进行详细的风险评估和飞行区域规划。我们会提前确定安全区、与观众的安全距离以及应急预案。'],
        },
        {
          heading: '主要措施',
          list: ['每次飞行前检查天气与风速', '电子围栏与自动失效保护返航', '全程备用无人机与技术团队待命', '活动保险保障'],
        },
      ],
    },
  },
  permits: {
    th: {
      title: 'การขออนุญาตการบิน',
      description: 'ขั้นตอนและเอกสารการขออนุญาตบินโดรนเพื่อการแสดง ภายใต้การกำกับของสำนักงานการบินพลเรือนแห่งประเทศไทย (กพท./CAAT)',
      sections: [
        {
          heading: 'เราดูแลให้ครบ',
          paragraphs: [
            'การแสดงโดรนต้องได้รับอนุญาตอย่างถูกต้องตามกฎหมาย LuminaSky ดำเนินการขออนุญาตและประสานงานกับหน่วยงานที่เกี่ยวข้องให้ลูกค้าตั้งแต่ต้นจนจบ',
          ],
        },
        {
          heading: 'สิ่งที่เราจัดการให้',
          list: ['ขออนุญาตการบินกับ กพท. (CAAT)', 'ประสานงานเขตการบินและหน่วยงานท้องถิ่น', 'จัดเตรียมเอกสารประกันภัยและความปลอดภัย'],
        },
        {
          paragraphs: ['ระยะเวลาดำเนินการขออนุญาตอาจใช้เวลาหลายสัปดาห์ แนะนำให้วางแผนงานล่วงหน้าอย่างน้อย 30–45 วัน'],
        },
      ],
    },
    en: {
      title: 'Flight Permits',
      description:
        'How drone-show flight permits work and what documents are required, under the oversight of the Civil Aviation Authority of Thailand (CAAT).',
      sections: [
        {
          heading: 'We handle it end to end',
          paragraphs: [
            'A drone show must be properly authorised by law. LuminaSky manages the permit application and coordinates with the relevant authorities on the client’s behalf, from start to finish.',
          ],
        },
        {
          heading: 'What we take care of',
          list: [
            'Flight authorisation with the CAAT',
            'Coordination of the flight zone and local authorities',
            'Insurance and safety documentation',
          ],
        },
        {
          paragraphs: ['Permit processing can take several weeks, so we recommend planning your event at least 30–45 days in advance.'],
        },
      ],
    },
    zh: {
      title: '飞行许可',
      description: '在泰国民航局(CAAT)监管下,无人机表演飞行许可的流程及所需文件。',
      sections: [
        {
          heading: '我们全程负责',
          paragraphs: ['无人机表演须依法获得正式批准。LuminaSky 代客户办理许可申请,并与相关部门协调,从头到尾全程负责。'],
        },
        {
          heading: '我们负责的事项',
          list: ['向泰国民航局(CAAT)申请飞行许可', '协调飞行区域与地方部门', '准备保险与安全文件'],
        },
        {
          paragraphs: ['许可办理可能需要数周时间,建议至少提前 30–45 天规划活动。'],
        },
      ],
    },
  },
  terms: {
    th: {
      title: 'ข้อกำหนดการใช้งาน',
      description: 'ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์และบริการของ LuminaSky',
      updated: UPDATED.th,
      sections: [
        { heading: '1. การยอมรับข้อกำหนด', paragraphs: ['การเข้าใช้งานเว็บไซต์นี้ถือว่าคุณยอมรับข้อกำหนดและเงื่อนไขทั้งหมด หากไม่ยอมรับ กรุณางดใช้งานเว็บไซต์'] },
        { heading: '2. การใช้บริการ', paragraphs: ['เนื้อหาในเว็บไซต์มีไว้เพื่อให้ข้อมูลเกี่ยวกับบริการของเรา การจองและเงื่อนไขการให้บริการจริงจะเป็นไปตามสัญญาที่ตกลงร่วมกันเป็นรายโครงการ'] },
        { heading: '3. ทรัพย์สินทางปัญญา', paragraphs: ['เนื้อหา ภาพ โลโก้ และงานออกแบบทั้งหมดบนเว็บไซต์เป็นทรัพย์สินของ LuminaSky ห้ามทำซ้ำหรือนำไปใช้โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร'] },
        { heading: '4. ข้อจำกัดความรับผิด', paragraphs: ['เราพยายามให้ข้อมูลถูกต้องและเป็นปัจจุบัน แต่ไม่รับประกันความครบถ้วนสมบูรณ์ และไม่รับผิดต่อความเสียหายที่เกิดจากการใช้ข้อมูลบนเว็บไซต์'] },
        { heading: '5. การติดต่อ', paragraphs: ['หากมีคำถามเกี่ยวกับข้อกำหนดนี้ ติดต่อเราที่ hello@luminasky.show'] },
      ],
    },
    en: {
      title: 'Terms of Use',
      description: 'The terms and conditions for using the LuminaSky website and services.',
      updated: UPDATED.en,
      sections: [
        { heading: '1. Acceptance of terms', paragraphs: ['By accessing this website you accept all of these terms and conditions. If you do not accept them, please do not use the website.'] },
        { heading: '2. Use of the service', paragraphs: ['Content on this website is provided for information about our services. Actual bookings and service terms are governed by the agreement made for each individual project.'] },
        { heading: '3. Intellectual property', paragraphs: ['All content, images, logos, and designs on this website are the property of LuminaSky. They may not be reproduced or used without written permission.'] },
        { heading: '4. Limitation of liability', paragraphs: ['We strive to keep information accurate and current but do not guarantee completeness, and are not liable for damages arising from use of the information on this website.'] },
        { heading: '5. Contact', paragraphs: ['If you have questions about these terms, contact us at hello@luminasky.show.'] },
      ],
    },
    zh: {
      title: '使用条款',
      description: 'LuminaSky 网站及服务的使用条款与条件。',
      updated: UPDATED.zh,
      sections: [
        { heading: '1. 条款的接受', paragraphs: ['访问本网站即表示您接受全部条款与条件。如不接受,请勿使用本网站。'] },
        { heading: '2. 服务的使用', paragraphs: ['本网站内容仅用于介绍我们的服务。实际预订及服务条款以各项目单独签订的协议为准。'] },
        { heading: '3. 知识产权', paragraphs: ['本网站所有内容、图片、标志与设计均为 LuminaSky 所有,未经书面许可不得复制或使用。'] },
        { heading: '4. 责任限制', paragraphs: ['我们力求信息准确及时,但不保证其完整性,且不对因使用本网站信息而产生的损失承担责任。'] },
        { heading: '5. 联系方式', paragraphs: ['如对本条款有疑问,请通过 hello@luminasky.show 联系我们。'] },
      ],
    },
  },
  privacy: {
    th: {
      title: 'นโยบายความเป็นส่วนตัว',
      description: 'นโยบายการเก็บรวบรวม ใช้ และคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้งานเว็บไซต์ LuminaSky',
      updated: UPDATED.th,
      sections: [
        { heading: '1. ข้อมูลที่เราเก็บรวบรวม', paragraphs: ['เราเก็บข้อมูลที่คุณให้โดยตรง เช่น ชื่อ อีเมล เบอร์โทร เมื่อคุณติดต่อหรือขอใบเสนอราคา รวมถึงข้อมูลการใช้งานเว็บไซต์โดยอัตโนมัติเพื่อการวิเคราะห์'] },
        { heading: '2. วัตถุประสงค์ในการใช้ข้อมูล', list: ['ติดต่อกลับและให้บริการตามที่คุณร้องขอ', 'ปรับปรุงเว็บไซต์และประสบการณ์การใช้งาน', 'ส่งข้อมูลข่าวสารเมื่อได้รับความยินยอม'] },
        { heading: '3. การเปิดเผยข้อมูล', paragraphs: ['เราจะไม่ขายหรือเปิดเผยข้อมูลส่วนบุคคลของคุณแก่บุคคลภายนอก ยกเว้นเพื่อการให้บริการที่จำเป็นหรือเมื่อกฎหมายกำหนด'] },
        { heading: '4. สิทธิของเจ้าของข้อมูล', paragraphs: ['คุณมีสิทธิเข้าถึง แก้ไข หรือขอลบข้อมูลส่วนบุคคลของคุณ ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) โดยติดต่อมาที่ privacy@luminasky.show'] },
      ],
    },
    en: {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect the personal data of LuminaSky website users.',
      updated: UPDATED.en,
      sections: [
        { heading: '1. Information we collect', paragraphs: ['We collect information you provide directly — such as your name, email, and phone number when you contact us or request a quote — as well as website usage data collected automatically for analytics.'] },
        { heading: '2. How we use information', list: ['Respond to you and provide the services you request', 'Improve the website and your experience', 'Send news when you have given consent'] },
        { heading: '3. Disclosure of information', paragraphs: ['We do not sell or disclose your personal data to third parties, except where necessary to provide our services or where required by law.'] },
        { heading: '4. Your rights', paragraphs: ['You have the right to access, correct, or request deletion of your personal data under Thailand’s Personal Data Protection Act (PDPA) by contacting privacy@luminasky.show.'] },
      ],
    },
    zh: {
      title: '隐私政策',
      description: 'LuminaSky 如何收集、使用并保护网站用户的个人数据。',
      updated: UPDATED.zh,
      sections: [
        { heading: '1. 我们收集的信息', paragraphs: ['我们收集您直接提供的信息——例如您联系我们或索取报价时提供的姓名、电子邮箱和电话号码——以及为分析而自动收集的网站使用数据。'] },
        { heading: '2. 信息的使用目的', list: ['回复您并提供您所请求的服务', '改进网站及您的使用体验', '在获得您同意后发送资讯'] },
        { heading: '3. 信息的披露', paragraphs: ['除为提供服务所必需或法律要求外,我们不会出售或向第三方披露您的个人数据。'] },
        { heading: '4. 您的权利', paragraphs: ['根据泰国《个人数据保护法》(PDPA),您有权访问、更正或要求删除您的个人数据,请联系 privacy@luminasky.show。'] },
      ],
    },
  },
  cookies: {
    th: {
      title: 'นโยบายคุกกี้',
      description: 'เว็บไซต์ LuminaSky ใช้คุกกี้อย่างไร และคุณจัดการความยินยอมได้อย่างไร',
      updated: UPDATED.th,
      sections: [
        { heading: 'คุกกี้คืออะไร', paragraphs: ['คุกกี้คือไฟล์ข้อมูลขนาดเล็กที่จัดเก็บบนอุปกรณ์ของคุณ ช่วยให้เว็บไซต์ทำงานได้อย่างถูกต้องและจดจำการตั้งค่าของคุณ'] },
        { heading: 'ประเภทคุกกี้ที่เราใช้', list: ['คุกกี้ที่จำเป็น — ทำให้เว็บไซต์ทำงานได้ เช่น การจดจำธีมและภาษา', 'คุกกี้เพื่อการวิเคราะห์ — ช่วยให้เราเข้าใจการใช้งานเพื่อปรับปรุงเว็บไซต์'] },
        { heading: 'การจัดการความยินยอม', paragraphs: ['คุณสามารถเลือกยอมรับหรือปฏิเสธคุกกี้ที่ไม่จำเป็นได้ผ่านแถบแจ้งเตือนคุกกี้ และปรับการตั้งค่าคุกกี้ได้จากเบราว์เซอร์ของคุณตลอดเวลา'] },
      ],
    },
    en: {
      title: 'Cookie Policy',
      description: 'How the LuminaSky website uses cookies and how you can manage your consent.',
      updated: UPDATED.en,
      sections: [
        { heading: 'What are cookies', paragraphs: ['Cookies are small data files stored on your device. They help the website work correctly and remember your preferences.'] },
        { heading: 'Types of cookies we use', list: ['Essential cookies — make the website work, e.g. remembering your theme and language', 'Analytics cookies — help us understand usage to improve the website'] },
        { heading: 'Managing consent', paragraphs: ['You can choose to accept or decline non-essential cookies through the cookie banner, and you can adjust cookie settings in your browser at any time.'] },
      ],
    },
    zh: {
      title: 'Cookie 政策',
      description: 'LuminaSky 网站如何使用 Cookie,以及您如何管理同意设置。',
      updated: UPDATED.zh,
      sections: [
        { heading: '什么是 Cookie', paragraphs: ['Cookie 是存储在您设备上的小型数据文件,可帮助网站正常运行并记住您的偏好设置。'] },
        { heading: '我们使用的 Cookie 类型', list: ['必要 Cookie——使网站正常运行,例如记住您的主题和语言', '分析 Cookie——帮助我们了解使用情况以改进网站'] },
        { heading: '管理同意', paragraphs: ['您可以通过 Cookie 提示条选择接受或拒绝非必要 Cookie,也可随时在浏览器中调整 Cookie 设置。'] },
      ],
    },
  },
}

export const CONTENT_SLUGS = Object.keys(PAGES)

/** Get a page's content for a locale, falling back to Thai. */
export function getPageContent(slug: string, locale: Locale): ContentPageData | null {
  const page = PAGES[slug]
  if (!page) return null
  return page[locale] ?? page.th
}
