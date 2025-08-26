import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { carId, startDate, endDate, clientName, clientPhone, clientEmail } =
      body;

    // Валидация на входните данни
    if (
      !carId ||
      !startDate ||
      !endDate ||
      !clientName ||
      !clientPhone ||
      !clientEmail
    ) {
      return NextResponse.json(
        {
          error:
            'All fields are required: carId, startDate, endDate, clientName, clientPhone, clientEmail',
        },
        { status: 400 }
      );
    }

    if (!GOOGLE_APPS_SCRIPT_URL) {
      return NextResponse.json(
        { error: 'Google Apps Script URL not configured' },
        { status: 500 }
      );
    }

    // Изпращаме заявка към Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'bookCar',
        carId,
        startDate,
        endDate,
        clientName,
        clientPhone,
        clientEmail,
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Unknown error from Google Apps Script');
    }

    // Логваме успешната резервация
    console.log('Booking created successfully:', {
      carId,
      clientName,
      startDate,
      endDate,
      reservationId: result.data?.reservationId,
    });

    return NextResponse.json({
      success: true,
      data: result.data,
      message: 'Booking created successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in /api/bookings:', error);
    return NextResponse.json(
      {
        error: 'Failed to create booking',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
