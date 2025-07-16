import { Notice, Region } from '@/types/notice';

// Mock data for demonstration
const mockNotices: Notice[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    message: 'Looking for high-quality cotton thread for weaving. Need 50kg for upcoming festival orders. Will pay good price!',
    region: 'Tamil Nadu',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2', 
    name: 'Meera Devi',
    message: 'Need 2 helpers for Pongal fair preparation. Pottery and craft arrangement work. Daily wages provided.',
    region: 'Tamil Nadu',
    createdAt: new Date('2024-01-14')
  },
  {
    id: '3',
    name: 'Arjun Reddy',
    message: 'Selling handmade terracotta pots and lamps. Special designs for Diwali. Contact for bulk orders.',
    region: 'Andhra Pradesh', 
    createdAt: new Date('2024-01-13')
  },
  {
    id: '4',
    name: 'Lakshmi Nair',
    message: 'Looking for coconut coir for basket weaving. Need sustainable supplier for regular orders.',
    region: 'Kerala',
    createdAt: new Date('2024-01-12')
  },
  {
    id: '5',
    name: 'Vikram Singh',
    message: 'Teaching traditional block printing techniques. Weekend workshop available. All materials provided.',
    region: 'Karnataka',
    createdAt: new Date('2024-01-11')
  },
  {
    id: '6',
    name: 'Priya Sharma',
    message: 'Need brass items for jewelry making. Looking for local suppliers with good quality metal work.',
    region: 'Maharashtra',
    createdAt: new Date('2024-01-10')
  }
];

class NoticeService {
  private notices: Notice[] = [...mockNotices];

  getAllNotices(region?: string): Notice[] {
    if (!region || region === 'All Regions') {
      return [...this.notices].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    return this.notices
      .filter(notice => notice.region === region)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  addNotice(noticeData: Omit<Notice, 'id' | 'createdAt'>): Notice {
    const newNotice: Notice = {
      ...noticeData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.notices.unshift(newNotice);
    return newNotice;
  }

  getRegions(): Region[] {
    return [
      "All Regions",
      "Tamil Nadu", 
      "Karnataka",
      "Kerala",
      "Andhra Pradesh",
      "Telangana",
      "Maharashtra"
    ];
  }
}

export const noticeService = new NoticeService();