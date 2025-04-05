import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/resumeInfoContext'
import { UserCircle as LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../service/GlobalApi';
import { toast } from 'sonner';

function PersonalDetails({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo.firstName || '',
        lastName: resumeInfo.lastName || '',
        jobTitle: resumeInfo.jobTitle || '',
        address: resumeInfo.address || '',
        phone: resumeInfo.phone || '',
        email: resumeInfo.email || ''
      });
    }
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    enabledNext(false);

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setResumeInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { data: formData };
      const response = await GlobalApi.UpdateResumeDetails(params?.resumeId, data);
      console.log(response);
      enabledNext(true);
      toast('Details updated successfully!');
    } catch (error) {
      console.error('Error updating details:', error);
      toast('Error updating details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-5 shadow-lg rounded-lg'>
      <h2 className='font-bold text-lg'>Personal Details</h2>
      <p>Get started with the basic information</p>
      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className='text-sm'>First Name</label>
            <Input
              name='firstName'
              value={formData.firstName}
              required
              onChange={handleInputChange}
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className='text-sm'>Last Name</label>
            <Input
              name='lastName'
              value={formData.lastName}
              required
              onChange={handleInputChange}
              placeholder="Enter your last name"
            />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Job Title</label>
            <Input
              name='jobTitle'
              value={formData.jobTitle}
              required
              onChange={handleInputChange}
              placeholder="Enter your job title"
            />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Address</label>
            <Input
              name='address'
              value={formData.address}
              required
              onChange={handleInputChange}
              placeholder="Enter your address"
            />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Phone</label>
            <Input
              name='phone'
              value={formData.phone}
              required
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              type="tel"
            />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Email</label>
            <Input
              name='email'
              value={formData.email}
              required
              onChange={handleInputChange}
              placeholder="Enter your email"
              type="email"
            />
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button
            disabled={loading}
            type='submit'
          >
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;